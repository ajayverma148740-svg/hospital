import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const where: any = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }

    const enquiries = await prisma.enquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(enquiries);
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, phone, email, subject, message, category } = body;

    if (!fullName || !phone || !message) {
      return NextResponse.json(
        { error: 'Name, phone number and message are required.' },
        { status: 400 }
      );
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email ? email.trim() : null,
        subject: subject || 'General Hospital Enquiry',
        category: category || 'General',
        message: message.trim(),
        status: 'NEW',
      },
    });

    return NextResponse.json(enquiry, { status: 201 });
  } catch (error: any) {
    console.error('Error submitting enquiry:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
