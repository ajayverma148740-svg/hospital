import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { appointmentId, phone } = await req.json();

    if (!appointmentId || !phone) {
      return NextResponse.json(
        { error: 'Appointment Reference ID and registered phone number are required.' },
        { status: 400 }
      );
    }

    const cleanRef = appointmentId.trim().toUpperCase();
    const cleanPhone = phone.trim().replace(/\D/g, '');

    const appointment = await prisma.appointment.findFirst({
      where: {
        appointmentId: cleanRef,
        patient: {
          phone: { contains: cleanPhone.slice(-10) },
        },
      },
      include: {
        patient: true,
        doctor: true,
        department: true,
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: 'No matching appointment found with the provided Reference ID and phone number.' },
        { status: 404 }
      );
    }

    return NextResponse.json(appointment);
  } catch (error) {
    console.error('Error tracking appointment:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
