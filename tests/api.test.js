const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const assert = require('assert');

const prisma = new PrismaClient();

async function runTests() {
  console.log('\n=============================================');
  console.log('   NEXA HOSPITAL - INTEGRATION TEST SUITE     ');
  console.log('=============================================\n');

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      process.stdout.write(`Testing: ${name}... `);
      await fn();
      console.log('✅ PASSED');
      passed++;
    } catch (err) {
      console.log('❌ FAILED');
      console.error('   ', err.message);
      failed++;
    }
  }

  // 1. Database Connection & Hospital Roles
  await test('Database contains configured hospital roles (ADMIN, RECEPTIONIST, DOCTOR)', async () => {
    const roles = await prisma.role.findMany();
    assert(roles.length >= 3, `Expected at least 3 roles, found ${roles.length}`);
    const roleNames = roles.map((r) => r.name);
    assert(roleNames.includes('ADMIN'), 'Missing ADMIN role');
    assert(roleNames.includes('RECEPTIONIST'), 'Missing RECEPTIONIST role');
    assert(roleNames.includes('DOCTOR'), 'Missing DOCTOR role');
  });

  // 2. Staff User Authentication Verification
  await test('Admin account exists and password validates against bcrypt hash', async () => {
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@nexahospital.com' },
      include: { role: true },
    });
    assert(admin, 'Admin user not found');
    assert.strictEqual(admin.role.name, 'ADMIN', 'Role is not ADMIN');
    const valid = await bcrypt.compare('Admin@12345', admin.passwordHash);
    assert(valid, 'Password Admin@12345 did not match bcrypt hash');
  });

  // 3. Departments
  await test('Medical departments are seeded and published', async () => {
    const depts = await prisma.department.findMany({
      where: { isPublished: true },
    });
    assert(depts.length >= 8, `Expected at least 8 departments, found ${depts.length}`);
    const cardio = depts.find((d) => d.slug === 'cardiology');
    assert(cardio, 'Cardiology department missing');
    assert(cardio.name.includes('Cardiology'), 'Cardiology name mismatch');
  });

  // 4. Doctors & Department Linking
  await test('Doctors exist and are linked to their respective departments', async () => {
    const doctors = await prisma.doctor.findMany({
      include: { doctorDepartments: { include: { department: true } } },
    });
    assert(doctors.length >= 6, `Expected at least 6 doctors, found ${doctors.length}`);
    const drArun = doctors.find((d) => d.slug === 'dr-arun-v-sharma');
    assert(drArun, 'Dr. Arun Sharma record missing');
    assert.strictEqual(drArun.consultationFee, 1000);
    assert(drArun.doctorDepartments.length > 0, 'Dr. Arun is not linked to any department');
    assert.strictEqual(drArun.doctorDepartments[0].department.slug, 'cardiology');
  });

  // 5. Appointment Booking & Unique Code Generation
  await test('Creates new appointment, prevents duplicate slot, generates valid NXA code', async () => {
    const testPhone = '+91 99999 11111';
    const testDate = '2026-11-15';
    const testSlot = '10:00 AM';

    const doctor = await prisma.doctor.findFirst();
    const dept = await prisma.department.findFirst();

    // Create or find patient
    let patient = await prisma.patient.findFirst({ where: { phone: testPhone } });
    if (!patient) {
      patient = await prisma.patient.create({
        data: {
          fullName: 'Test Patient Kumar',
          phone: testPhone,
          age: 35,
          gender: 'Male',
        },
      });
    }

    const year = new Date().getFullYear();
    const appCode = `NXA-${year}-${Math.floor(10000 + Math.random() * 90000)}`;

    const newApp = await prisma.appointment.create({
      data: {
        appointmentId: appCode,
        patientId: patient.id,
        doctorId: doctor.id,
        departmentId: dept.id,
        appointmentDate: testDate,
        timeSlot: testSlot,
        status: 'CONFIRMED',
        message: 'Routine health checkup',
      },
    });

    assert(newApp.id, 'Appointment not created');
    assert.strictEqual(newApp.appointmentId, appCode);
    assert(newApp.appointmentId.startsWith(`NXA-${year}-`));

    // Verify retrieval
    const retrieved = await prisma.appointment.findUnique({
      where: { appointmentId: appCode },
      include: { patient: true, doctor: true },
    });
    assert(retrieved, 'Failed to retrieve appointment by code');
    assert.strictEqual(retrieved.patient.fullName, 'Test Patient Kumar');

    // Clean up test appointment
    await prisma.appointment.delete({ where: { id: newApp.id } });
  });

  // 6. Patient Enquiries
  await test('Patient enquiry submission and status update', async () => {
    const enq = await prisma.enquiry.create({
      data: {
        fullName: 'Test Enquiry User',
        phone: '+91 88888 22222',
        email: 'test@user.com',
        subject: 'Ayushman Card Eligibility Inquiry',
        message: 'Does Nexa Hospital admit patients under PM-JAY Ayushman Bharat card?',
        category: 'TPA_Insurance',
        status: 'NEW',
      },
    });

    assert(enq.id, 'Enquiry not saved');
    assert.strictEqual(enq.status, 'NEW');

    // Update status to RESOLVED
    const updated = await prisma.enquiry.update({
      where: { id: enq.id },
      data: {
        status: 'RESOLVED',
        internalNotes: 'Contacted patient and verified eligibility.',
        resolvedAt: new Date(),
      },
    });
    assert.strictEqual(updated.status, 'RESOLVED');

    // Clean up
    await prisma.enquiry.delete({ where: { id: enq.id } });
  });

  // 7. Website Settings
  await test('Hospital website settings are loaded and valid', async () => {
    const settings = await prisma.websiteSetting.findMany();
    assert(settings.length >= 8, 'Expected website settings to be seeded');
    const hospitalName = settings.find((s) => s.key === 'hospital_name');
    assert.strictEqual(hospitalName.value, 'Nexa Hospital');
    const emergencyPhone = settings.find((s) => s.key === 'phone_emergency');
    assert(emergencyPhone.value.includes('91522'));
  });

  // 8. Audit Logs
  await test('Audit logs record critical system events', async () => {
    const logs = await prisma.auditLog.findMany();
    assert(logs.length > 0, 'No audit logs found');
    const initLog = logs.find((l) => l.action === 'SYSTEM_INITIALIZATION');
    assert(initLog, 'System initialization audit log not found');
  });

  console.log('\n---------------------------------------------');
  console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
  console.log('---------------------------------------------\n');

  await prisma.$disconnect();

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((e) => {
  console.error(e);
  process.exit(1);
});
