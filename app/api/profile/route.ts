import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { ProfileUpdateInput } from '@/lib/validations/profile';

export async function GET() {
  const user = await verifyToken();
  
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  return NextResponse.json(user);
}

export async function PUT(request: Request) {
  const user = await verifyToken();
  
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const data = await request.json() as ProfileUpdateInput;

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data,
  });

  return NextResponse.json(updatedUser);
}