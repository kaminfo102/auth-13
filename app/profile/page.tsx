import { verifyToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Pencil } from 'lucide-react';

export default async function ProfilePage() {
  const user = await verifyToken();
  if (!user) redirect('/login');

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">پروفایل کاربری</h1>
        <Link href="/profile/edit">
          <Button className="gap-2">
            <Pencil className="h-4 w-4" />
            ویرایش پروفایل
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>اطلاعات شخصی</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">نام:</span>
              <span>{user.firstName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">نام خانوادگی:</span>
              <span>{user.lastName}</span>
            </div>
            {user.fatherName && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">نام پدر:</span>
                <span>{user.fatherName}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">کد ملی:</span>
              <span>{user.nationalId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">تاریخ تولد:</span>
              <span>{new Date(user.birthDate).toLocaleDateString('fa-IR')}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>اطلاعات تحصیلی</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">شهرستان:</span>
              <span>{user.city}</span>
            </div>
            {user.school && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">آموزشگاه:</span>
                <span>{user.school}</span>
              </div>
            )}
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
            {/* <div className="flex justify-between">
              <span className="text-muted-foreground">ایمیل:</span>
              <span>{user.email}</span>
            </div> */}
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
    </div>
  );
}