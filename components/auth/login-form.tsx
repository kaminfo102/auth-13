'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginInput, loginSchema } from '@/lib/validations/auth';
import { login } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/ui/loading';
import { User, Lock } from 'lucide-react';

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      nationalId: '',
      password: '',
    },
  });

  async function onSubmit(data: LoginInput) {
    try {
      setLoading(true);
      await login(data);
      toast.success('ورود موفقیت‌آمیز', {
        icon: '🎉',
        duration: 3000,
      });
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'خطایی رخ داد', {
        icon: '❌',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <LoadingSpinner />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="nationalId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام کاربری (کد ملی) یا </FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input {...field} className="pr-10" disabled={loading} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رمز عبور</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input {...field} type="password" className="pr-10" disabled={loading} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'لطفا صبر کنید...' : 'ورود'}
          </Button>
        </form>
      </Form>
    </>
  );
}