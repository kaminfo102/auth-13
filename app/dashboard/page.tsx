import { verifyToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, School, Users, User, Mail, Phone, MapPin, BookOpen, ChevronDown } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
      <h1 className="text-3xl font-bold mb-8 text-center">
        {user.role === 'ADMIN' ? 'داشبورد مدیریت' : 'داشبورد فراگیر'}
      </h1>

      {/* آواتار کاربر */}
      <div className="flex justify-center mb-8">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary">
          <Image
            src="/avatar-sample.jpg" // تصویر آواتار نمونه
            alt="User Avatar"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      {user.role === 'ADMIN' ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-400 text-white hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">تعداد فراگیران</CardTitle>
              <Users className="h-6 w-6 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats._count._all}</div>
              <p className="text-xs">+20 از ماه گذشته</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-400 text-white hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">شهرستان‌ها</CardTitle>
              <MapPin className="h-6 w-6 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{citiesStats.length}</div>
              <p className="text-xs">+2 از ماه گذشته</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-400 text-white hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">میانگین ترم</CardTitle>
              <BookOpen className="h-6 w-6 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">۵</div>
              <p className="text-xs">+0.1 از ماه گذشته</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid gap-6">
          <Card className="bg-gradient-to-r from-pink-500 to-pink-400 text-white hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-6 w-6" />
                <span>اطلاعات شخصی</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="personal-info">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-2">
                      <ChevronDown className="h-4 w-4" />
                      <span>مشاهده اطلاعات شخصی</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="flex justify-between">
                      <span>نام و نام خانوادگی:</span>
                      <span className="font-medium">{user.firstName} {user.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>کد ملی:</span>
                      <span className="font-medium">{user.nationalId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>شهرستان:</span>
                      <span className="font-medium">{user.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ترم:</span>
                      <span className="font-medium">{user.term}</span>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-indigo-500 to-indigo-400 text-white hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-6 w-6" />
                <span>اطلاعات تماس</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="contact-info">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-2">
                      <ChevronDown className="h-4 w-4" />
                      <span>مشاهده اطلاعات تماس</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    {/* <div className="flex justify-between">
                      <span>ایمیل:</span>
                      <span className="font-medium">{user.email}</span>
                    </div> */}
                    <div className="flex justify-between">
                      <span>موبایل:</span>
                      <span className="font-medium">{user.mobile}</span>
                    </div>
                    {user.phone && (
                      <div className="flex justify-between">
                        <span>تلفن ثابت:</span>
                        <span className="font-medium">{user.phone}</span>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}