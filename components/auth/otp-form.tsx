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
import { OTPInput } from '@/components/forms/otp-input';
import { useRouter } from 'next/navigation';

const mobileSchema = z.object({
  mobile: z.string()
    .regex(/^09\d{9}$/, 'شماره موبایل نامعتبر است')
    .refine(val => val.length === 11, 'شماره موبایل باید 11 رقم باشد')
});

const otpSchema = z.object({
  code: z.string()
    .length(6, 'کد تایید باید 6 رقم باشد')
    .regex(/^\d+$/, 'فقط ارقام مجاز هستند')
});

type MobileInput = z.infer<typeof mobileSchema>;
type OtpInput = z.infer<typeof otpSchema>;

export function OtpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [mobile, setMobile] = useState('');
  const [otpError, setOtpError] = useState<string | null>(null);

  const mobileForm = useForm<MobileInput>({
    resolver: zodResolver(mobileSchema),
    defaultValues: { mobile: '' }
  });

  const otpForm = useForm<OtpInput>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: '' }
  });

  async function onMobileSubmit(data: MobileInput) {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(await res.text());

      setMobile(data.mobile);
      setStep('otp');
      setOtpError(null); // Reset OTP error
      toast.success('کد تایید ارسال شد');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'خطایی رخ داد');
    } finally {
      setLoading(false);
    }
  }

  async function onOtpSubmit(data: OtpInput) {
    try {
      setLoading(true);
      setOtpError(null); // Reset error before validation
      const res = await fetch('/api/auth/otp', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, code: data.code }),
      });

      if (!res.ok) throw new Error(await res.text());

      toast.success('ورود موفقیت‌آمیز');
      router.push('/dashboard');
      router.refresh();
      // window.location.href = '/dashboard';
    } catch (error) {
      setOtpError(error instanceof Error ? error.message : 'کد تایید نامعتبر است');
    } finally {
      setLoading(false);
    }
  }

  if (step === 'mobile') {
    return (
      <Form {...mobileForm}>
        <form onSubmit={mobileForm.handleSubmit(onMobileSubmit)} className="space-y-4">
          <FormField
            control={mobileForm.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>شماره موبایل</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    disabled={loading}
                    placeholder="09123456789"
                    inputMode="numeric"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'لطفا صبر کنید...' : 'ارسال کد تایید'}
          </Button>
        </form>
      </Form>
    );
  }

  return (
    <Form {...otpForm}>
      <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground">
            کد تایید به شماره {mobile} ارسال شد
          </p>
        </div>

        <FormField
          control={otpForm.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>کد تایید 6 رقمی</FormLabel>
              <FormControl>
                <OTPInput
                  length={6}
                  onComplete={(code) => field.onChange(code)}
                  onResend={() => onMobileSubmit({ mobile })}
                  loading={loading}
                  error={otpError}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'لطفا صبر کنید...' : 'تایید و ورود'}
        </Button>
      </form>
    </Form>
  );
}