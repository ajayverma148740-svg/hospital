import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionFromRequest, hashPassword } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const [logs, staffUsers] = await Promise.all([
      prisma.auditLog.findMany({
        take: 50,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          isActive: true,
          lastLoginAt: true,
          role: true,
        },
        orderBy: { createdAt: 'asc' },
      }),
    ]);

    return NextResponse.json({ logs, staffUsers });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { email, password, name, roleName, phone } = await req.json();

    if (!email || !password || !name || !roleName) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const role = await prisma.role.findUnique({
      where: { name: roleName },
    });

    if (!role) {
      return NextResponse.json({ error: 'Invalid role specified.' }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        passwordHash,
        name: name.trim(),
        roleId: role.id,
        phone,
        isActive: true,
      },
      include: { role: true },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.id,
        userName: session.name,
        action: 'STAFF_CREATED',
        entity: 'user',
        entityId: newUser.id,
        details: `Created new staff account: ${newUser.name} with role ${role.name}`,
      },
    });

    return NextResponse.json(
      {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role.name,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating staff account:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
