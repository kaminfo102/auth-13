import { verifyToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, School, Users } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const user = await verifyToken();
  if (!user) redirect('/login');

  const stats = await prisma.user.aggregate({
    _count: {
      _all: true,
    },
    where: {
      role: 'STUDENT',
    },
  });

  const citiesStats = await prisma.user.groupBy({
    by: ['city'],
    _count: {
      _all: true,
    },
    where: {
      role: 'STUDENT',
    },
  });

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">
        {user.role === 'ADMIN' ? 'داشبورد مدیریت' : 'داشبورد فراگیر'}
      </h1>

      {user.role === 'ADMIN' ? (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">تعداد فراگیران</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats._count._all}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">شهرستان‌ها</CardTitle>
              <School className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{citiesStats.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">میانگین ترم</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">۵</div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>اطلاعات شخصی</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">نام و نام خانوادگی:</span>
                <span>{user.firstName} {user.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">کد ملی:</span>
                <span>{user.nationalId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">شهرستان:</span>
                <span>{user.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ترم:</span>
                <span>{user.term}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>اطلاعات تماس</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ایمیل:</span>
                <span>{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">موبایل:</span>
                <span>{user.mobile}</span>
              </div>
              {user.phone && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">تلفن ثابت:</span>
                  <span>{user.phone}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}