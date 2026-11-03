import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const appointment = await prisma.appointment.findFirst({
      where: {
        OR: [{ id }, { appointmentId: id }],
      },
      include: {
        patient: true,
        doctor: true,
        department: true,
      },
    });

    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    return NextResponse.json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSessionFromRequest(req);
    const { id } = params;
    const body = await req.json();

    const existing = await prisma.appointment.findFirst({
      where: {
        OR: [{ id }, { appointmentId: id }],
      },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    const updated = await prisma.appointment.update({
      where: { id: existing.id },
      data: {
        status: body.status || existing.status,
        appointmentDate: body.appointmentDate || existing.appointmentDate,
        timeSlot: body.timeSlot || existing.timeSlot,
        cancellationReason: body.cancellationReason !== undefined ? body.cancellationReason : existing.cancellationReason,
        internalNotes: body.internalNotes !== undefined ? body.internalNotes : existing.internalNotes,
      },
      include: {
        patient: true,
        doctor: true,
        department: true,
      },
    });

    // Audit log if session present
    if (session) {
      await prisma.auditLog.create({
        data: {
          userId: session.id,
          userName: session.name,
          action: `APPOINTMENT_${body.status || 'UPDATED'}`,
          entity: 'appointment',
          entityId: existing.id,
          details: `Appointment ${existing.appointmentId} status changed to ${body.status || existing.status}`,
        },
      });
    }

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Error updating appointment:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = params;
    await prisma.appointment.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting appointment:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
