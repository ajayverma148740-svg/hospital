import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const departmentId = searchParams.get('departmentId');

    const where: any = { isActive: true };

    if (departmentId) {
      where.doctorDepartments = {
        some: { departmentId },
      };
    }

    const doctors = await prisma.doctor.findMany({
      where,
      include: {
        doctorDepartments: {
          include: {
            department: true,
          },
        },
      },
      orderBy: { experienceYears: 'desc' },
    });

    return NextResponse.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session || (session.role !== 'ADMIN' && session.role !== 'RECEPTIONIST')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    const {
      name,
      email,
      phone,
      designation,
      qualification,
      experienceYears,
      biography,
      opdSchedule,
      consultationFee,
      departmentId,
      avatar,
    } = body;

    if (!name || !email || !designation || !qualification) {
      return NextResponse.json({ error: 'Missing required doctor fields' }, { status: 400 });
    }

    const slug = name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const newDoctor = await prisma.doctor.create({
      data: {
        name,
        slug: `${slug}-${Math.floor(100 + Math.random() * 900)}`,
        email,
        phone,
        avatar: avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
        designation,
        qualification,
        experienceYears: Number(experienceYears) || 5,
        biography: biography || 'Dedicated healthcare specialist providing expert clinical consultations at Nexa Hospital.',
        opdSchedule: opdSchedule || 'Mon - Sat: 10:00 AM - 02:00 PM',
        consultationFee: Number(consultationFee) || 800,
        isActive: true,
      },
    });

    if (departmentId) {
      await prisma.doctorDepartment.create({
        data: {
          doctorId: newDoctor.id,
          departmentId,
          isPrimary: true,
        },
      });
    }

    await prisma.auditLog.create({
      data: {
        userId: session.id,
        userName: session.name,
        action: 'DOCTOR_CREATED',
        entity: 'doctor',
        entityId: newDoctor.id,
        details: `Added new doctor: ${newDoctor.name} (${newDoctor.designation})`,
      },
    });

    return NextResponse.json(newDoctor, { status: 201 });
  } catch (error: any) {
    console.error('Error creating doctor:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
