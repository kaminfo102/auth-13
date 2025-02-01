import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { prisma } from './prisma';

const secretKey = new TextEncoder().encode(
  process.env.JWT_SECRET_KEY || 'your-secret-key'
);

export async function createToken(userId: string) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1d')
    .sign(secretKey);

  cookies().set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  return token;
}

export async function verifyToken() {
  const token = cookies().get('token')?.value;

  if (!token) return null;

  try {
    const verified = await jwtVerify(token, secretKey);
    const user = await prisma.user.findUnique({
      where: { id: verified.payload.userId as string },
    });

    return user;
  } catch {
    return null;
  }
}

export async function logout() {
  cookies().delete('token');
}

export type UserRole = 'ADMIN' | 'STUDENT';

export function isAdmin(role: string): role is UserRole {
  return role === 'ADMIN';
}