import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, School, ArrowLeft } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <span className="text-xl font-bold">سامانه آموزشی</span>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">ورود</Button>
            </Link>
            <Link href="/register">
              <Button>ثبت نام</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              سامانه مدیریت آموزشی استان کردستان
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              سامانه جامع مدیریت آموزشی برای فراگیران و مدیران آموزشی استان کردستان
            </p>
            <div className="mt-10 flex items-center justify-center gap-6">
              <Link href="/register">
                <Button size="lg" className="gap-2">
                  شروع کنید
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">
                  ورود به سامانه
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="container py-16">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">مدیریت فراگیران</h3>
              <p className="text-muted-foreground">
                مدیریت آسان اطلاعات و وضعیت تحصیلی فراگیران
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <School className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">مدیریت آموزشگاه‌ها</h3>
              <p className="text-muted-foreground">
                نظارت و مدیریت بر آموزشگاه‌های سطح استان
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">پیشرفت تحصیلی</h3>
              <p className="text-muted-foreground">
                پیگیری و نظارت بر پیشرفت تحصیلی فراگیران
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-right">
            تمامی حقوق محفوظ است © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}