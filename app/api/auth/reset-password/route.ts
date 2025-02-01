import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { randomBytes } from 'crypto';

export async function POST(request: NextRequest) {
  const { nationalId } = await request.json();

  const user = await prisma.user.findUnique({
    where: { nationalId },
  });

  if (!user) {
    return new NextResponse('کاربری با این ایمیل یافت نشد', { status: 404 });
  }

  const resetToken = randomBytes(32).toString('hex');
  const hashedResetToken = await hash(resetToken, 12);

  await prisma.user.update({
    where: { nationalId },
    data: {
      resetToken: hashedResetToken,
      resetTokenExpiry: new Date(Date.now() + 3600000), // 1 hour
    },
  });

  // TODO: Send reset password email
  // For now, we'll just return the token
  return NextResponse.json({ resetToken });
}

export async function PUT(request: NextRequest) {
  const { token, password } = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    return new NextResponse('توکن نامعتبر یا منقضی شده است', { status: 400 });
  }

  const hashedPassword = await hash(password, 12);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  return NextResponse.json({ message: 'رمز عبور با موفقیت تغییر کرد' });
}