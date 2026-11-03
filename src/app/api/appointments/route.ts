import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateAppointmentId } from '@/lib/utils';
import { getSessionFromRequest } from '@/lib/auth';

// GET all appointments (with search & filters for Admin)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const date = searchParams.get('date');
    const doctorId = searchParams.get('doctorId');
    const departmentId = searchParams.get('departmentId');
    const search = searchParams.get('search');

    const where: any = {};

    if (status && status !== 'ALL') {
      where.status = status;
    }

    if (date) {
      where.appointmentDate = date;
    }

    if (doctorId && doctorId !== 'ALL') {
      where.doctorId = doctorId;
    }

    if (departmentId && departmentId !== 'ALL') {
      where.departmentId = departmentId;
    }

    if (search) {
      where.OR = [
        { appointmentId: { contains: search } },
        { patient: { fullName: { contains: search } } },
        { patient: { phone: { contains: search } } },
      ];
    }

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        patient: true,
        doctor: true,
        department: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}

// POST create a new appointment (public patient booking)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      phone,
      email,
      age,
      gender,
      departmentId,
      doctorId,
      appointmentDate,
      timeSlot,
      message,
    } = body;

    // Strict validation
    if (!fullName || !phone || !doctorId || !departmentId || !appointmentDate || !timeSlot) {
      return NextResponse.json(
        { error: 'Please provide all required appointment details.' },
        { status: 400 }
      );
    }

    const cleanPhone = phone.trim();

    // Prevent duplicate booking for same doctor, date and time slot
    const existingSlot = await prisma.appointment.findFirst({
      where: {
        doctorId,
        appointmentDate,
        timeSlot,
        status: { in: ['CONFIRMED', 'PENDING'] },
      },
    });

    if (existingSlot) {
      return NextResponse.json(
        { error: 'This time slot is already reserved. Please select another slot.' },
        { status: 409 }
      );
    }

    // Upsert / find patient by phone
    let patient = await prisma.patient.findFirst({
      where: { phone: cleanPhone },
    });

    if (!patient) {
      patient = await prisma.patient.create({
        data: {
          fullName: fullName.trim(),
          phone: cleanPhone,
          email: email ? email.trim() : null,
          age: age ? Number(age) : null,
          gender: gender || 'Male',
        },
      });
    } else {
      // Update email/age if provided
      await prisma.patient.update({
        where: { id: patient.id },
        data: {
          fullName: fullName.trim(),
          email: email ? email.trim() : patient.email,
          age: age ? Number(age) : patient.age,
          gender: gender || patient.gender,
        },
      });
    }

    // Generate unique Appointment Reference ID
    const appointmentId = generateAppointmentId();

    const appointment = await prisma.appointment.create({
      data: {
        appointmentId,
        patientId: patient.id,
        doctorId,
        departmentId,
        appointmentDate,
        timeSlot,
        status: 'CONFIRMED', // Pre-confirmed upon OTP submission
        message: message ? message.trim() : null,
      },
      include: {
        patient: true,
        doctor: true,
        department: true,
      },
    });

    // Record notification queue
    await prisma.notification.create({
      data: {
        recipient: cleanPhone,
        type: 'SMS',
        subject: 'Nexa Hospital Appointment Confirmation',
        body: `Dear ${fullName}, your appointment at Nexa Hospital with ${appointment.doctor.name} on ${appointmentDate} at ${timeSlot} is confirmed. Ref: ${appointmentId}. Helpline: 0522 350 4999.`,
        referenceId: appointmentId,
        status: 'SENT',
      },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error: any) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { error: error.message || 'Server error while booking appointment.' },
      { status: 500 }
    );
  }
}
