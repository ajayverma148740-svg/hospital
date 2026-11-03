import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

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

    const updated = await prisma.enquiry.update({
      where: { id },
      data: {
        status: body.status,
        internalNotes: body.internalNotes,
        assignedTo: body.assignedTo,
        resolvedAt: body.status === 'RESOLVED' ? new Date() : undefined,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.id,
        userName: session.name,
        action: 'ENQUIRY_UPDATED',
        entity: 'enquiry',
        entityId: id,
        details: `Updated enquiry status to ${body.status}`,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Error updating enquiry:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
