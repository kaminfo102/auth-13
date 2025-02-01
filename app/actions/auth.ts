'use server'

import { hash, compare } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { createToken } from '@/lib/auth';
import { LoginInput, RegisterInput } from '@/lib/validations/auth';

export async function login(data: LoginInput) {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        
        { nationalId: data.nationalId },
      ]
    },
  });

  if (!user) {
    throw new Error('نام کاربری یا رمز عبور اشتباه است');
  }

  const isValid = await compare(data.password, user.password);

  if (!isValid) {
    throw new Error('نام کاربری یا رمز عبور اشتباه است');
  }

  await createToken(user.id);

  return user;
}

export async function register(data: RegisterInput) {
  const exists = await prisma.user.findFirst({
    where: {
      OR: [
        
        { nationalId: data.nationalId },
        { mobile: data.mobile },
      ],
    },
  });

  if (exists) {
    throw new Error('کاربری با این مشخصات قبلاً ثبت نام کرده است');
  }

  const hashedPassword = await hash(data.password, 12);

  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
      birthDate: new Date(data.birthDate),
      role: 'STUDENT',
    },
  });

  await createToken(user.id);

  return user;
}

export async function createDefaultAdmin() {
  try {
    const exists = await prisma.user.findFirst({
      where: { nationalId: '3733161580' },
    });

    if (!exists) {
      const hashedPassword = await hash('admin123', 12);
      await prisma.user.create({
        data: {
          password: hashedPassword,
          firstName: 'کامیل',
          lastName: 'میرزایی',
          nationalId: '3733161580',
          birthDate: new Date(),
          city: 'سنندج',
          term: 1,
          mobile: '09185227308',
          role: 'ADMIN',
        },
      });
    }
  } catch (error) {
    console.error('Failed to create default admin:', error);
  }
}