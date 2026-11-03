import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const department = await prisma.department.findUnique({
      where: { slug },
      include: {
        doctorDepartments: {
          include: {
            doctor: true,
          },
        },
      },
    });

    if (!department) {
      return NextResponse.json({ error: 'Department not found' }, { status: 404 });
    }

    return NextResponse.json(department);
  } catch (error) {
    console.error('Error fetching department details:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { slug } = params;
    const body = await req.json();

    const updated = await prisma.department.update({
      where: { slug },
      data: {
        name: body.name,
        shortDescription: body.shortDescription,
        fullDescription: body.fullDescription,
        image: body.image,
        services: typeof body.services === 'string' ? body.services : JSON.stringify(body.services || []),
        isPublished: body.isPublished !== undefined ? body.isPublished : true,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.id,
        userName: session.name,
        action: 'DEPARTMENT_UPDATED',
        entity: 'department',
        entityId: updated.id,
        details: `Updated department: ${updated.name}`,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Error updating department:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
