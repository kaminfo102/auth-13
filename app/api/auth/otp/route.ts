import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendVerificationCode } from '@/lib/sms';

export async function POST(request: NextRequest) {
  const { mobile } = await request.json();

  const user = await prisma.user.findUnique({
    where: { mobile },
  });

  if (!user) {
    return new NextResponse('کاربری با این شماره موبایل یافت نشد', { status: 404 });
  }

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await sendVerificationCode(mobile, otpCode);

    await prisma.user.update({
      where: { mobile },
      data: {
        otpCode,
        otpExpiry: new Date(Date.now() + 300000), // 5 minutes
      },
    });

    return NextResponse.json({ message: 'کد تایید ارسال شد' });
  } catch (error) {
    console.error('Error sending SMS:', error);
    return new NextResponse('خطا در ارسال پیامک', { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const { mobile, code } = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      mobile,
      otpCode: code,
      otpExpiry: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    return new NextResponse('کد تایید نامعتبر یا منقضی شده است', { status: 400 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      otpCode: null,
      otpExpiry: null,
    },
  });

  return NextResponse.json({ message: 'کد تایید صحیح است' });
}