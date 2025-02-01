import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  const user = await verifyToken();
  
  if (!user || user.role !== 'ADMIN') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const students = await prisma.user.findMany({
    where: {
      role: 'STUDENT',
    },
    select: {
      city: true,
      term: true,
    },
  });

  const cityStats = students.reduce((acc, student) => {
    acc[student.city] = (acc[student.city] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const termStats = students.reduce((acc, student) => {
    acc[student.term] = (acc[student.term] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const averageTerm = students.reduce((sum, student) => sum + student.term, 0) / (students.length || 1);

  return NextResponse.json({
    totalStudents: students.length,
    cities: Object.keys(cityStats).length,
    averageTerm,
    cityStats: Object.entries(cityStats).map(([city, count]) => ({
      city,
      count,
    })),
    termStats: Object.entries(termStats).map(([term, count]) => ({
      term: parseInt(term),
      count,
    })).sort((a, b) => a.term - b.term),
  });
}