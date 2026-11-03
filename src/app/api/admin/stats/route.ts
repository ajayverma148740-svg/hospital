import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const todayStr = new Date().toISOString().split('T')[0];

    const [
      totalAppointments,
      todayAppointments,
      pendingAppointments,
      confirmedAppointments,
      totalDoctors,
      totalDepartments,
      recentEnquiries,
      recentAppointments,
    ] = await Promise.all([
      prisma.appointment.count(),
      prisma.appointment.count({ where: { appointmentDate: todayStr } }),
      prisma.appointment.count({ where: { status: 'PENDING' } }),
      prisma.appointment.count({ where: { status: 'CONFIRMED' } }),
      prisma.doctor.count({ where: { isActive: true } }),
      prisma.department.count({ where: { isPublished: true } }),
      prisma.enquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.appointment.findMany({
        take: 6,
        orderBy: { createdAt: 'desc' },
        include: {
          patient: true,
          doctor: true,
          department: true,
        },
      }),
    ]);

    return NextResponse.json({
      totalAppointments,
      todayAppointments,
      pendingAppointments,
      confirmedAppointments,
      totalDoctors,
      totalDepartments,
      recentEnquiries,
      recentAppointments,
    });
  } catch (error) {
    console.error('Error fetching admin statistics:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
