import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Check by id or slug
    const doctor = await prisma.doctor.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        doctorDepartments: {
          include: {
            department: true,
          },
        },
        schedules: true,
      },
    });

    if (!doctor) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }

    return NextResponse.json(doctor);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session || (session.role !== 'ADMIN' && session.role !== 'RECEPTIONIST')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = params;
    const body = await req.json();

    const updated = await prisma.doctor.update({
      where: { id },
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        designation: body.designation,
        qualification: body.qualification,
        experienceYears: body.experienceYears !== undefined ? Number(body.experienceYears) : undefined,
        biography: body.biography,
        opdSchedule: body.opdSchedule,
        consultationFee: body.consultationFee !== undefined ? Number(body.consultationFee) : undefined,
        isActive: body.isActive !== undefined ? body.isActive : undefined,
        avatar: body.avatar,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.id,
        userName: session.name,
        action: 'DOCTOR_UPDATED',
        entity: 'doctor',
        entityId: updated.id,
        details: `Updated doctor profile: ${updated.name}`,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Error updating doctor:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
