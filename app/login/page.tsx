import Link from 'next/link';
import { LoginForm } from '@/components/auth/login-form';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/register"
        className="absolute left-4 top-4 md:right-8 md:top-8"
      >
        <Button variant="ghost">ثبت نام</Button>
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/">سامانه آموزشی</Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              سامانه جامع مدیریت آموزشی برای فراگیران و مدیران آموزشی استان کردستان
            </p>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              ورود به حساب کاربری
            </h1>
            <p className="text-sm text-muted-foreground">
              برای ورود به سامانه، اطلاعات خود را وارد کنید
            </p>
          </div>
          <LoginForm />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                یا
              </span>
            </div>
          </div>
          <Link href="/login-otp">
            <Button variant="outline" className="w-full">
              ورود با رمز یکبار مصرف
            </Button>
          </Link>
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/reset-password"
              className="hover:text-primary"
            >
              رمز عبور خود را فراموش کرده‌اید؟
            </Link>
          </p>
          <p className="px-8 text-center text-sm text-muted-foreground">
            حساب کاربری ندارید؟{' '}
            <Link
              href="/register"
              className="underline underline-offset-4 hover:text-primary"
            >
              ثبت نام کنید
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}