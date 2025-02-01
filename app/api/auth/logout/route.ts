import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  cookies().delete('token');
  return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_APP_URL));
}