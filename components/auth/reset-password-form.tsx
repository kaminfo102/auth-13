'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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

const resetSchema = z.object({
  nationalId: z.string().min(10,'کد ملی نامعتبر است'),
});

const newPasswordSchema = z.object({
  password: z.string().min(6, 'رمز عبور باید حداقل 6 کاراکتر باشد'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'رمز عبور و تکرار آن باید یکسان باشند',
  path: ['confirmPassword'],
});

type ResetInput = z.infer<typeof resetSchema>;
type NewPasswordInput = z.infer<typeof newPasswordSchema>;

export function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [token, setToken] = useState('');

  const requestForm = useForm<ResetInput>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      nationalId: '',
    },
  });

  const resetForm = useForm<NewPasswordInput>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onRequestSubmit(data: ResetInput) {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(await res.text());

      const { resetToken } = await res.json();
      setToken(resetToken);
      setStep('reset');
      toast.success('لینک بازیابی رمز عبور ارسال شد');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'خطایی رخ داد');
    } finally {
      setLoading(false);
    }
  }

  async function onResetSubmit(data: NewPasswordInput) {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/reset-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: data.password }),
      });

      if (!res.ok) throw new Error(await res.text());

      toast.success('رمز عبور با موفقیت تغییر کرد');
      window.location.href = '/login';
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'خطایی رخ داد');
    } finally {
      setLoading(false);
    }
  }

  if (step === 'request') {
    return (
      <Form {...requestForm}>
        <form onSubmit={requestForm.handleSubmit(onRequestSubmit)} className="space-y-4">
          <FormField
            control={requestForm.control}
            name="nationalId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>کد ملی</FormLabel>
                <FormControl>
                  <Input {...field} type="text" disabled={loading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'لطفا صبر کنید...' : 'ارسال لینک بازیابی'}
          </Button>
        </form>
      </Form>
    );
  }

  return (
    <Form {...resetForm}>
      <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-4">
        <FormField
          control={resetForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رمز عبور جدید</FormLabel>
              <FormControl>
                <Input {...field} type="password" disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={resetForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>تکرار رمز عبور</FormLabel>
              <FormControl>
                <Input {...field} type="password" disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'لطفا صبر کنید...' : 'تغییر رمز عبور'}
        </Button>
      </form>
    </Form>
  );
}