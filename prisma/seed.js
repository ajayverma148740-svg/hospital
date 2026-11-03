const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('--- Seeding Nexa Hospital Lucknow Database ---');

  // 1. Roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: {
      name: 'ADMIN',
      description: 'Super Administrator with full hospital governance privileges',
    },
  });

  const receptionistRole = await prisma.role.upsert({
    where: { name: 'RECEPTIONIST' },
    update: {},
    create: {
      name: 'RECEPTIONIST',
      description: 'Front Desk & Patient Care Coordinator for appointments & enquiries',
    },
  });

  const doctorRole = await prisma.role.upsert({
    where: { name: 'DOCTOR' },
    update: {},
    create: {
      name: 'DOCTOR',
      description: 'Consultant Medical Practitioner with clinical scheduling & OPD access',
    },
  });

  console.log('Roles created: ADMIN, RECEPTIONIST, DOCTOR');

  // 2. Default Users
  const salt = await bcrypt.genSalt(10);
  const adminHash = await bcrypt.hash('Admin@12345', salt);
  const receptHash = await bcrypt.hash('Recept@12345', salt);
  const doctorHash = await bcrypt.hash('Doctor@12345', salt);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@nexahospital.com' },
    update: {},
    create: {
      email: 'admin@nexahospital.com',
      passwordHash: adminHash,
      name: 'Dr. Vikram Malhotra (Medical Director)',
      roleId: adminRole.id,
      phone: '+91 522 350 4999',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    },
  });

  const receptUser = await prisma.user.upsert({
    where: { email: 'reception@nexahospital.com' },
    update: {},
    create: {
      email: 'reception@nexahospital.com',
      passwordHash: receptHash,
      name: 'Sunita Sharma (Front Desk Executive)',
      roleId: receptionistRole.id,
      phone: '+91 91522 99108',
      avatar: 'https://images.unsplash.com/photo-1594824813682-12797e88b63e?auto=format&fit=crop&q=80&w=400',
    },
  });

  console.log('Default staff users created:');
  console.log(' - Admin: admin@nexahospital.com / Admin@12345');
  console.log(' - Receptionist: reception@nexahospital.com / Recept@12345');

  // 3. Departments
  const departmentsData = [
    {
      name: 'Cardiology & Heart Care',
      slug: 'cardiology',
      shortDescription: 'Advanced cardiac diagnosis, 24/7 Cath Lab, angioplasty, pacemaker and cardiac intensive care.',
      fullDescription: 'The Department of Cardiology at Nexa Hospital Lucknow provides comprehensive cardiac care with round-the-clock emergency intervention for acute heart attacks (Primary PCI). Equipped with state-of-the-art flat-panel digital Cath Lab, non-invasive cardiac lab (Echo, TMT, Holter), and dedicated 12-bed Cardiac Intensive Care Unit (CICU).',
      icon: 'HeartPulse',
      image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=1000',
      services: JSON.stringify([
        '24x7 Primary Angioplasty (PCI)',
        'Coronary Angiography',
        'Permanent Pacemaker Implantation (PPI)',
        'Echocardiography & Color Doppler',
        'Treadmill Stress Testing (TMT)',
        'Heart Failure Management Clinic'
      ]),
      sortOrder: 1,
    },
    {
      name: 'Orthopaedics & Joint Replacement',
      slug: 'orthopaedics',
      shortDescription: 'Computer-navigated total knee & hip replacement, arthroscopy, and trauma fracture surgery.',
      fullDescription: 'Nexa Orthopaedic Centre of Excellence specializes in minimally invasive joint replacement, sports injury reconstruction, spinal disorders, and polytrauma fracture care. With laminar airflow Class 100 modular OTs and dedicated physiotherapy rehabilitation, we restore painless mobility.',
      icon: 'Bone',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000',
      services: JSON.stringify([
        'Computer Navigated Total Knee Replacement (TKR)',
        'Total Hip Replacement (THR)',
        'Knee & Shoulder Arthroscopy',
        'Complex Trauma & Fracture Reconstruction',
        'Spine Surgery & Slip Disc Treatment',
        'Specialized Sports Injury Rehab'
      ]),
      sortOrder: 2,
    },
    {
      name: 'Neurology & Neurosurgery',
      slug: 'neurology',
      shortDescription: 'Comprehensive stroke management unit, epilepsy clinic, and brain & spine surgical excellence.',
      fullDescription: 'Our neurosciences team offers cutting-edge medical and surgical care for complex nervous system disorders. Features a rapid-response acute stroke thrombolysis protocol, advanced EEG/EMG neurodiagnostics, and precision microsurgical neuro-navigation equipment.',
      icon: 'Brain',
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1000',
      services: JSON.stringify([
        'Acute Stroke Care & Thrombolysis (24/7)',
        'Epilepsy & Seizure Diagnostic Clinic',
        'Minimally Invasive Spine Surgery',
        'Head Trauma & Neuro ICU',
        'Parkinson & Movement Disorder Care',
        'Digital Video EEG & Nerve Conduction Studies'
      ]),
      sortOrder: 3,
    },
    {
      name: 'Obstetrics & Gynaecology',
      slug: 'obstetrics-gynaecology',
      shortDescription: 'Compassionate maternal care, high-risk pregnancy management, painless delivery and laparoscopic surgery.',
      fullDescription: 'Nexa Mother & Child Care provides warm, comprehensive care across all stages of womanhood. From prenatal screening and painless labour delivery suites (LDR) to advanced gynecological laparoscopy, our team supports maternal wellness with 24/7 emergency obstetrics coverage.',
      icon: 'Baby',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1000',
      services: JSON.stringify([
        'High-Risk Pregnancy Management',
        'Painless Normal Delivery Suites (LDR)',
        'Advanced Gynecological Laparoscopy',
        'Infertility Workup & Guidance',
        'Cervical Cancer Screening (Pap Smear & HPV)',
        'Menopause Management Clinic'
      ]),
      sortOrder: 4,
    },
    {
      name: 'Emergency & Critical Care (ICU)',
      slug: 'emergency-trauma',
      shortDescription: '24x7 Level-1 trauma care, cardiac emergency triage, advanced resuscitation bays and multi-bed ICU.',
      fullDescription: 'Nexa Emergency Department is staffed round the clock by ACLS/ATLS certified trauma specialists, intensivists, and emergency nurses. Seamlessly connected with our diagnostic radiology and catheterization lab for immediate lifesaving intervention.',
      icon: 'Siren',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000',
      services: JSON.stringify([
        '24x7 Acute Trauma Resuscitation Bay',
        'Advanced Cardiac Life Support Ambulances',
        'Multi-bed Tertiary Intensive Care Unit (ICU)',
        'Non-Invasive & Mechanical Ventilation',
        'Poisoning & Toxicology Protocol',
        'Bedside Point-of-Care Ultrasound & Blood Gas'
      ]),
      sortOrder: 5,
    },
    {
      name: 'General & Laparoscopic Surgery',
      slug: 'general-surgery',
      shortDescription: 'Minimally invasive keyhole surgery for gallbladder stones, hernia, appendix, and gastrointestinal care.',
      fullDescription: 'Equipped with High-Definition 4K Laparoscopic Towers, our surgical team performs minimally invasive procedures that ensure less pain, negligible scarring, and fast discharge within 24 to 48 hours.',
      icon: 'Activity',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1000',
      services: JSON.stringify([
        'Laparoscopic Cholecystectomy (Gallbladder)',
        'Minimally Invasive Hernia Repair (TEP/TAPP)',
        'Laparoscopic Appendectomy',
        'Laser Proctology (Piles, Fissure, Fistula)',
        'Thyroid & Breast Tumour Surgeries',
        'Diabetic Foot & Wound Care Unit'
      ]),
      sortOrder: 6,
    },
    {
      name: 'Paediatrics & Neonatology',
      slug: 'paediatrics',
      shortDescription: 'Dedicated Level III NICU, comprehensive newborn care, paediatric intensive care, and vaccination centre.',
      fullDescription: 'Providing gentle, family-centered medical care for newborns, infants, and teenagers. Our Level III Neonatal ICU provides incubator life support and phototherapy for premature infants and critical newborns.',
      icon: 'Heart',
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1000',
      services: JSON.stringify([
        'Level III Neonatal Intensive Care Unit (NICU)',
        'Comprehensive Child Vaccination Schedule',
        'Paediatric Allergy & Asthma Clinic',
        'Growth & Developmental Milestone Assessment',
        'Pediatric Emergency Care',
        'Nutritional Counselling for Toddlers'
      ]),
      sortOrder: 7,
    },
    {
      name: 'Nephrology & Dialysis',
      slug: 'nephrology',
      shortDescription: 'Modern hemodialysis centre, kidney stone management, diabetic kidney care, and renal hypertension.',
      fullDescription: 'Our nephrology department offers state-of-the-art dialysis stations featuring double reverse osmosis (RO) purified water systems, strict infection control, and continuous nephrologist supervision.',
      icon: 'ShieldCheck',
      image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1000',
      services: JSON.stringify([
        '24x7 Maintenance Hemodialysis',
        'Bedside SLED for Critically Ill ICU Patients',
        'AV Fistula Creation & Permacath Insertion',
        'Renal Biopsy & Glomerular Diagnostics',
        'Diabetic Nephropathy Protection Clinic',
        'Kidney Stone Prevention Program'
      ]),
      sortOrder: 8,
    },
  ];

  const createdDepartments = {};
  for (const dep of departmentsData) {
    const d = await prisma.department.upsert({
      where: { slug: dep.slug },
      update: dep,
      create: dep,
    });
    createdDepartments[dep.slug] = d;
  }
  console.log(`Created ${Object.keys(createdDepartments).length} departments.`);

  // 4. Doctors
  const doctorsData = [
    {
      name: 'Dr. Arun V. Sharma',
      slug: 'dr-arun-v-sharma',
      email: 'dr.arun@nexahospital.com',
      phone: '+91 94520 11001',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
      designation: 'Director & Chief Interventional Cardiologist',
      qualification: 'MBBS, MD (Medicine), DM (Cardiology) - AIIMS New Delhi, FACC (USA)',
      experienceYears: 18,
      biography: 'Dr. Arun V. Sharma is one of North India’s most distinguished interventional cardiologists with over 18 years of clinical experience. He has successfully performed more than 8,000 coronary angiographies and 4,500 angioplasties, including complex bifurcation lesions and primary emergency PCIs. Formerly associated with AIIMS and Fortis Healthcare, he leads the Cardiac Sciences Department at Nexa Hospital.',
      opdSchedule: 'Mon - Sat: 10:00 AM - 02:00 PM & 05:00 PM - 07:00 PM',
      consultationFee: 1000,
      rating: 4.9,
      reviewCount: 342,
      isFeatured: true,
      departmentSlug: 'cardiology',
    },
    {
      name: 'Dr. Priya Awasthi',
      slug: 'dr-priya-awasthi',
      email: 'dr.priya@nexahospital.com',
      phone: '+91 94520 11002',
      avatar: 'https://images.unsplash.com/photo-1594824813682-12797e88b63e?auto=format&fit=crop&q=80&w=600',
      designation: 'Senior Consultant - Obstetrics & Gynaecology',
      qualification: 'MBBS, MS (Obstetrics & Gynaecology) - KGMU Lucknow, Fellowship in Fetal Medicine',
      experienceYears: 14,
      biography: 'Dr. Priya Awasthi is a renowned gynaecologist and high-risk pregnancy specialist. With 14+ years of dedicated practice, she is widely revered across Lucknow for her gentle, patient-friendly bedside manner and unwavering commitment to encouraging painless natural deliveries whenever clinically possible.',
      opdSchedule: 'Mon - Sat: 09:30 AM - 01:30 PM & 04:30 PM - 06:30 PM',
      consultationFee: 800,
      rating: 4.95,
      reviewCount: 420,
      isFeatured: true,
      departmentSlug: 'obstetrics-gynaecology',
    },
    {
      name: 'Dr. Rajeshwar Singh',
      slug: 'dr-rajeshwar-singh',
      email: 'dr.rajeshwar@nexahospital.com',
      phone: '+91 94520 11003',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600',
      designation: 'Head of Department - Orthopaedics & Joint Replacement',
      qualification: 'MBBS, MS (Ortho), MCh Orth (UK), Fellowship in Joint Reconstruction (Germany)',
      experienceYears: 20,
      biography: 'Dr. Rajeshwar Singh is a fellowship-trained pioneer in computer-navigated robotic joint replacements. He has conducted over 5,000 successful total knee and hip replacements. He emphasizes rapid recovery protocols enabling patients to begin walking within 24 hours post-surgery.',
      opdSchedule: 'Mon - Fri: 10:30 AM - 03:00 PM',
      consultationFee: 900,
      rating: 4.88,
      reviewCount: 285,
      isFeatured: true,
      departmentSlug: 'orthopaedics',
    },
    {
      name: 'Dr. Sameer Khan',
      slug: 'dr-sameer-khan',
      email: 'dr.sameer@nexahospital.com',
      phone: '+91 94520 11004',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600',
      designation: 'Senior Consultant Neurologist & Stroke Specialist',
      qualification: 'MBBS, MD (General Medicine), DM (Neurology) - SGPGI Lucknow',
      experienceYears: 12,
      biography: 'Dr. Sameer Khan trained at the prestigious Sanjay Gandhi Postgraduate Institute of Medical Sciences (SGPGI). He is an expert in managing ischemic stroke, intractable epilepsy, migraine, multiple sclerosis, and peripheral neuropathies. He spearheads Nexa’s Code Stroke protocol.',
      opdSchedule: 'Mon, Wed, Fri, Sat: 11:00 AM - 04:00 PM',
      consultationFee: 850,
      rating: 4.85,
      reviewCount: 194,
      isFeatured: true,
      departmentSlug: 'neurology',
    },
    {
      name: 'Dr. Meenakshi Verma',
      slug: 'dr-meenakshi-verma',
      email: 'dr.meenakshi@nexahospital.com',
      phone: '+91 94520 11005',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
      designation: 'Chief Consultant Paediatrician & Neonatologist',
      qualification: 'MBBS, MD (Paediatrics), Fellowship in Neonatology (IAP)',
      experienceYears: 11,
      biography: 'Dr. Meenakshi Verma specializes in neonatal intensive care and acute paediatric emergencies. Known for her empathetic touch with nervous parents, she has guided hundreds of premature infants through the Level III NICU to healthy infancy.',
      opdSchedule: 'Mon - Sat: 09:00 AM - 01:00 PM & 05:00 PM - 07:00 PM',
      consultationFee: 700,
      rating: 4.92,
      reviewCount: 310,
      isFeatured: false,
      departmentSlug: 'paediatrics',
    },
    {
      name: 'Dr. Alok Kumar Tiwari',
      slug: 'dr-alok-tiwari',
      email: 'dr.alok@nexahospital.com',
      phone: '+91 94520 11006',
      avatar: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&q=80&w=600',
      designation: 'Senior Consultant General & Laparoscopic Surgeon',
      qualification: 'MBBS, MS (Surgery), FIAGES, FMAS',
      experienceYears: 16,
      biography: 'Dr. Alok Tiwari brings over 16 years of expertise in minimal access laparoscopic surgeries for gallbladder, hernia, appendicitis, and gastrointestinal conditions. He is recognized for his meticulous technique and rapid-recovery surgical pathways.',
      opdSchedule: 'Mon - Sat: 10:00 AM - 02:00 PM',
      consultationFee: 750,
      rating: 4.87,
      reviewCount: 228,
      isFeatured: false,
      departmentSlug: 'general-surgery',
    },
  ];

  const createdDoctors = [];
  for (const docData of doctorsData) {
    const { departmentSlug, ...doctorFields } = docData;
    const department = createdDepartments[departmentSlug];

    const doctor = await prisma.doctor.upsert({
      where: { slug: doctorFields.slug },
      update: doctorFields,
      create: doctorFields,
    });

    if (department) {
      await prisma.doctorDepartment.upsert({
        where: {
          doctorId_departmentId: {
            doctorId: doctor.id,
            departmentId: department.id,
          },
        },
        update: {},
        create: {
          doctorId: doctor.id,
          departmentId: department.id,
          isPrimary: true,
        },
      });
    }

    // Add standard OPD schedules (Monday through Saturday)
    for (let day = 1; day <= 6; day++) {
      await prisma.doctorSchedule.create({
        data: {
          doctorId: doctor.id,
          dayOfWeek: day,
          startTime: '09:30',
          endTime: '13:30',
          slotDuration: 30,
          maxPatients: 16,
          isActive: true,
        },
      });
    }

    createdDoctors.push(doctor);
  }
  console.log(`Created ${createdDoctors.length} doctors with schedules.`);

  // 5. Sample Patients & Appointments
  const patientsData = [
    {
      fullName: 'Rameshwar Dayal Srivastava',
      phone: '+91 98390 12345',
      email: 'rameshwar.sriv@gmail.com',
      age: 62,
      gender: 'Male',
      address: 'Sector 4, Gomti Nagar Extension, Lucknow',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
    },
    {
      fullName: 'Sunita Trivedi',
      phone: '+91 94150 98765',
      email: 'sunita.trivedi@outlook.com',
      age: 34,
      gender: 'Female',
      address: 'Near Malhaur Railway Crossing, Chinhat, Lucknow',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
    },
    {
      fullName: 'Mohd. Farhan Ansari',
      phone: '+91 87654 32109',
      email: 'farhan.ansari99@gmail.com',
      age: 48,
      gender: 'Male',
      address: 'Indira Nagar, Block C, Lucknow',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
    },
    {
      fullName: 'Pooja Agarwal',
      phone: '+91 99351 44556',
      email: 'pooja.agarwal@gmail.com',
      age: 28,
      gender: 'Female',
      address: 'Vipul Khand, Gomti Nagar, Lucknow',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
    },
  ];

  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const sampleAppointments = [
    {
      patientIndex: 0,
      doctorIndex: 0, // Dr. Arun Sharma (Cardiology)
      departmentSlug: 'cardiology',
      date: todayStr,
      timeSlot: '10:30 AM',
      status: 'CONFIRMED',
      message: 'Experiencing intermittent chest discomfort and shortness of breath during brisk walking.',
    },
    {
      patientIndex: 1,
      doctorIndex: 1, // Dr. Priya Awasthi (OBGYN)
      departmentSlug: 'obstetrics-gynaecology',
      date: todayStr,
      timeSlot: '11:00 AM',
      status: 'CONFIRMED',
      message: 'Routine second-trimester fetal anomaly ultrasound review and nutritional consultation.',
    },
    {
      patientIndex: 2,
      doctorIndex: 2, // Dr. Rajeshwar Singh (Ortho)
      departmentSlug: 'orthopaedics',
      date: tomorrow,
      timeSlot: '11:30 AM',
      status: 'PENDING',
      message: 'Chronic severe bilateral knee pain, difficulty climbing stairs for past 6 months.',
    },
    {
      patientIndex: 3,
      doctorIndex: 3, // Dr. Sameer Khan (Neuro)
      departmentSlug: 'neurology',
      date: tomorrow,
      timeSlot: '02:00 PM',
      status: 'PENDING',
      message: 'Frequent throbbing unilateral headaches accompanied by nausea and light sensitivity.',
    },
  ];

  for (let i = 0; i < sampleAppointments.length; i++) {
    const appData = sampleAppointments[i];
    const patData = patientsData[appData.patientIndex];

    const patient = await prisma.patient.create({
      data: patData,
    });

    const doc = createdDoctors[appData.doctorIndex];
    const dept = createdDepartments[appData.departmentSlug];

    const year = new Date().getFullYear();
    const appCode = `NXA-${year}-${10020 + i}`;

    await prisma.appointment.create({
      data: {
        appointmentId: appCode,
        patientId: patient.id,
        doctorId: doc.id,
        departmentId: dept.id,
        appointmentDate: appData.date,
        timeSlot: appData.timeSlot,
        status: appData.status,
        message: appData.message,
      },
    });
  }
  console.log('Sample verified patients and appointments seeded.');

  // 6. Patient Enquiries
  const enquiriesData = [
    {
      fullName: 'Anil Kumar Shukla',
      phone: '+91 94500 88776',
      email: 'anil.shukla@gmail.com',
      subject: 'Query regarding Star Health Cashless Mediclaim Admission',
      message: 'Hello, my father requires elective cataract and cardiac evaluation. Does Nexa Hospital have cashless TPA tie-up with Star Health Insurance? Please share the desk contact.',
      category: 'TPA_Insurance',
      status: 'NEW',
    },
    {
      fullName: 'Shalini Saxena',
      phone: '+91 98380 43210',
      email: 'shalini.saxena@yahoo.com',
      subject: 'Doctor OPD timings on Sunday',
      message: 'Is Dr. Priya Awasthi available for OPD consultation on Sunday mornings? Please confirm.',
      category: 'OPD',
      status: 'IN_REVIEW',
      internalNotes: 'Contacted patient via WhatsApp; informed Sunday emergency on-call schedule.',
    },
    {
      fullName: 'Capt. Virendra Nath (Retd)',
      phone: '+91 97920 65432',
      email: 'virendra.nath@gmail.com',
      subject: 'Executive Comprehensive Health Checkup Package',
      message: 'Looking for full-body master cardiac and metabolic health package for senior citizens. Please email the brochure.',
      category: 'General',
      status: 'RESOLVED',
      internalNotes: 'Executive health checkup brochure emailed on 28th Oct.',
    },
  ];

  for (const enq of enquiriesData) {
    await prisma.enquiry.create({
      data: enq,
    });
  }
  console.log('Patient enquiries seeded.');

  // 7. Verified Patient Testimonials
  const testimonialsData = [
    {
      patientName: 'Shri B. K. Tripathi',
      treatment: 'Emergency Primary Angioplasty (Heart Attack)',
      doctorName: 'Dr. Arun V. Sharma',
      rating: 5,
      location: 'Gomti Nagar, Lucknow',
      comment: 'When I suffered acute chest pain at 2 AM, Nexa Hospital’s emergency ambulance reached our residence in 12 minutes. Dr. Arun Sharma and the Cath Lab team saved my life with emergency stenting within the golden hour. World-class medical infrastructure right in Lucknow!',
      isVerified: true,
      isApproved: true,
      isFeatured: true,
    },
    {
      patientName: 'Mrs. Neha & Vikas Rastogi',
      treatment: 'High-Risk Pregnancy & Painless Delivery',
      doctorName: 'Dr. Priya Awasthi',
      rating: 5,
      location: 'Chinhat, Lucknow',
      comment: 'Dr. Priya Awasthi provided constant warmth and confidence throughout my twin pregnancy. The LDR delivery suite was like a luxury hotel with exceptional nursing staff. We are blessed with two healthy baby girls. Forever grateful to Nexa Hospital!',
      isVerified: true,
      isApproved: true,
      isFeatured: true,
    },
    {
      patientName: 'Devendra Pratap Singh (Retd. PWD Chief)',
      treatment: 'Bilateral Computer-Navigated Total Knee Replacement',
      doctorName: 'Dr. Rajeshwar Singh',
      rating: 5,
      location: 'Aliganj, Lucknow',
      comment: 'I had been bedridden with severe osteoarthritis for 3 years. Dr. Rajeshwar Singh performed computer-navigated knee replacement on both legs. On Day 2, their physiotherapy team had me walking with support. Now I walk 3 kilometers daily without pain!',
      isVerified: true,
      isApproved: true,
      isFeatured: true,
    },
    {
      patientName: 'Smt. Kamla Devi Yadav',
      treatment: 'Laparoscopic Gallbladder Surgery',
      doctorName: 'Dr. Alok Kumar Tiwari',
      rating: 5,
      location: 'Indira Nagar, Lucknow',
      comment: 'Extremely clean hospital with transparent billing. Dr. Alok Tiwari explained the surgery calmly. I had zero pain after surgery and was discharged within 24 hours. The insurance TPA desk handled our claim seamlessly.',
      isVerified: true,
      isApproved: true,
      isFeatured: true,
    },
  ];

  for (const t of testimonialsData) {
    await prisma.testimonial.create({
      data: t,
    });
  }
  console.log('Verified testimonials seeded.');

  // 8. Frequently Asked Questions (FAQs)
  const faqsData = [
    {
      question: 'What are the OPD consultation timings at Nexa Hospital?',
      answer: 'Our Outpatient Department (OPD) operates Monday to Saturday from 08:00 AM to 08:00 PM across all specialities. Select senior consultants are also available for Sunday clinics from 09:00 AM to 02:00 PM. Emergency and Trauma services operate 24 hours, 7 days a week.',
      category: 'Appointment',
      sortOrder: 1,
    },
    {
      question: 'Does Nexa Hospital offer cashless treatment for health insurance policies?',
      answer: 'Yes. Nexa Hospital is empaneled with all major government and private TPAs/insurers including Star Health, HDFC ERGO, ICICI Lombard, Care Health, Niva Bupa, Bajaj Allianz, New India Assurance, and Ayushman Bharat (PM-JAY). Our 24/7 dedicated TPA desk manages pre-authorization and quick claim approvals.',
      category: 'Insurance & Cashless',
      sortOrder: 2,
    },
    {
      question: 'How do I book an emergency ambulance in Lucknow?',
      answer: 'You can instantly dial our 24/7 Emergency & Critical Ambulance Helpline at +91 91522 99108 or our direct hospital line +91 522 350 4999. Our Advanced Life Support (ALS) ambulances are equipped with defibrillators, transport ventilators, and trained emergency medical paramedics.',
      category: 'Emergency',
      sortOrder: 3,
    },
    {
      question: 'Can I track or reschedule my appointment online?',
      answer: 'Yes! After booking an appointment, you receive a unique Nexa Tracking ID (e.g. NXA-2025-XXXXX) via SMS and email. You can visit the "Track Appointment" section on our website at any time to check status, download appointment slips, or reschedule your slot.',
      category: 'Appointment',
      sortOrder: 4,
    },
    {
      question: 'What are the patient visiting hours for Inpatient Suites and ICU?',
      answer: 'For general and private patient suites, visiting hours are 11:00 AM to 01:00 PM and 05:00 PM to 07:00 PM (1 visitor allowed at a time with pass). For Intensive Care Units (ICU/CICU/NICU), to maintain sterile infection control, visiting is strictly restricted to 05:00 PM - 06:00 PM for immediate family members.',
      category: 'Visiting Hours',
      sortOrder: 5,
    },
    {
      question: 'Where is Nexa Hospital located in Lucknow?',
      answer: 'Nexa Hospital is strategically situated near Malhaur Railway Station, Nizampur, Chinhat, Lucknow, UP 226028. It is conveniently accessible from Gomti Nagar Extension, Faizabad Road (Ayodhya Highway), and Shaheed Path. Ample valet parking is available on campus.',
      category: 'General',
      sortOrder: 6,
    },
  ];

  for (const faq of faqsData) {
    await prisma.faq.create({
      data: faq,
    });
  }
  console.log('FAQs seeded.');

  // 9. Gallery Items
  const galleryData = [
    {
      title: 'Digital Cath Lab & Interventional Suite',
      category: 'Infrastructure',
      imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200',
      caption: 'Advanced Philips Flat-Panel Cath Lab for 24/7 primary angioplasties and pacemaker interventions.',
      sortOrder: 1,
    },
    {
      title: 'Laminar Airflow Class 100 Modular OT',
      category: 'Operation Theatre',
      imageUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200',
      caption: 'Ultra-clean sterile joint replacement and neurosurgery theatres with HEPA air filtration.',
      sortOrder: 2,
    },
    {
      title: 'Multidisciplinary Intensive Care Unit (ICU)',
      category: 'ICU & Rooms',
      imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200',
      caption: 'Round-the-clock monitoring with high-end Hamilton ventilators and central hemodynamics.',
      sortOrder: 3,
    },
    {
      title: 'Premium Inpatient Deluxe Suite',
      category: 'ICU & Rooms',
      imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=1200',
      caption: 'Spacious patient room equipped with motorized beds, attendant couches, and hygienic ensuite facilities.',
      sortOrder: 4,
    },
    {
      title: 'Advanced 1.5T MRI & 128-Slice CT Scanner',
      category: 'Diagnostics',
      imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200',
      caption: 'High-speed diagnostic imaging for neurological, cardiovascular, and abdominal investigations.',
      sortOrder: 5,
    },
    {
      title: 'Community Free Health Camp in Chinhat',
      category: 'Events',
      imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1200',
      caption: 'Over 850 rural patients screened for hypertension, diabetes, and bone mineral density.',
      sortOrder: 6,
    },
  ];

  for (const g of galleryData) {
    await prisma.galleryItem.create({
      data: g,
    });
  }
  console.log('Gallery seeded.');

  // 10. Website Settings
  const settingsData = [
    { key: 'hospital_name', value: 'Nexa Hospital', category: 'general' },
    { key: 'hospital_tagline', value: 'Your Health, Our Priority.', category: 'general' },
    { key: 'hospital_address', value: 'Near Malhaur Railway Station, Nizampur, Chinhat, Lucknow, Uttar Pradesh 226028', category: 'contact' },
    { key: 'phone_general', value: '+91 522 350 4999', category: 'contact' },
    { key: 'phone_emergency', value: '+91 91522 99108', category: 'emergency' },
    { key: 'phone_ambulance', value: '+91 91522 99108 / 108', category: 'emergency' },
    { key: 'whatsapp_number', value: '+919152299108', category: 'contact' },
    { key: 'email_contact', value: 'contact@nexahospital.com', category: 'contact' },
    { key: 'email_appointments', value: 'appointments@nexahospital.com', category: 'contact' },
    { key: 'opd_timings', value: 'Mon - Sat: 08:00 AM - 08:00 PM | Sun: 09:00 AM - 02:00 PM', category: 'hours' },
    { key: 'emergency_timings', value: '24 Hours / 7 Days Open (Always Available)', category: 'hours' },
    { key: 'google_maps_url', value: 'https://maps.app.goo.gl/kCBhC8C9eyxRQJpr8', category: 'contact' },
    { key: 'nabh_accreditation', value: 'NABH Accredited & ISO 9001:2015 Certified Hospital', category: 'general' },
  ];

  for (const s of settingsData) {
    await prisma.websiteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value, category: s.category },
      create: s,
    });
  }
  console.log('Website settings seeded.');

  // 11. Initial Audit Log
  await prisma.auditLog.create({
    data: {
      userId: adminUser.id,
      userName: adminUser.name,
      action: 'SYSTEM_INITIALIZATION',
      entity: 'database',
      details: 'Initial hospital database seed completed with verified medical services, doctors, and settings.',
      ipAddress: '127.0.0.1',
    },
  });

  console.log('--- Nexa Hospital Database Seed Completed Successfully ---');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
