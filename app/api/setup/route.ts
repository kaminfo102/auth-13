import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    const exists = await prisma.user.findFirst({
      where: { nationalId: '3733161580' },
    });

    if (!exists) {
      const hashedPassword = await hash('admin123', 12);
      await prisma.user.create({
        data: {
          password: hashedPassword,
          firstName: 'کامیل ',
          lastName: 'میرزائی',
          nationalId: '3733161580',
          birthDate: new Date(),
          city: 'سنندج',
          term: 1,
          mobile: '09000000000',
          role: 'ADMIN',
        },
      });
    }

    return NextResponse.json({ message: 'Setup completed successfully' });
  } catch (error) {
    console.error('Setup error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}