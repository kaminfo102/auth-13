import Link from 'next/link';
import { ResetPasswordForm } from '@/components/auth/reset-password-form';
import { Button } from '@/components/ui/button';

export default function ResetPasswordPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/login"
        className="absolute left-4 top-4 md:right-8 md:top-8"
      >
        <Button variant="ghost">بازگشت به صفحه ورود</Button>
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
              بازیابی رمز عبور
            </h1>
            <p className="text-sm text-muted-foreground">
              برای بازیابی رمز عبور، ایمیل خود را وارد کنید
            </p>
          </div>
          <ResetPasswordForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            به یاد آوردید؟{' '}
            <Link
              href="/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              وارد شوید
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}