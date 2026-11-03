import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET() {
  try {
    const departments = await prisma.department.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { doctorDepartments: true },
        },
      },
    });
    return NextResponse.json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    return NextResponse.json({ error: 'Failed to fetch departments' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session || (session.role !== 'ADMIN' && session.role !== 'RECEPTIONIST')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    const { name, shortDescription, fullDescription, icon, image, services } = body;

    if (!name || !shortDescription || !fullDescription) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
    }

    const slug = name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const newDept = await prisma.department.create({
      data: {
        name,
        slug,
        shortDescription,
        fullDescription,
        icon: icon || 'Activity',
        image: image || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
        services: typeof services === 'string' ? services : JSON.stringify(services || []),
        isPublished: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.id,
        userName: session.name,
        action: 'DEPARTMENT_CREATED',
        entity: 'department',
        entityId: newDept.id,
        details: `Created new department: ${newDept.name}`,
      },
    });

    return NextResponse.json(newDept, { status: 201 });
  } catch (error: any) {
    console.error('Error creating department:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
