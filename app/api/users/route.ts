import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  const user = await verifyToken();
  
  if (!user || user.role !== 'ADMIN') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const users = await prisma.user.findMany({
    where: {
      role: 'STUDENT',
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      nationalId: true,
      birthDate: true,
      mobile: true,
      city: true,
      term: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(users);
}