'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterInput, registerSchema } from '@/lib/validations/auth';
import { register } from '@/app/actions/auth';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { KURDISTAN_CITIES, TERMS } from '@/lib/constants';
import { LoadingSpinner } from '@/components/ui/loading';
import { User, Mail, Phone, School, Calendar, Hash, Lock } from 'lucide-react';

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      fatherName: '',
      nationalId: '',
      birthDate: '',
      city: 'سنندج',
      school: '',
      term: 1,
      mobile: '',
      phone: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: RegisterInput) {
    try {
      setLoading(true);
      await register(data);
      toast.success('ثبت نام با موفقیت انجام شد', {
        icon: '🎉',
        description: `نام کاربری شما: ${data.nationalId}`,
        duration: 5000,
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام</FormLabel>
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
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام خانوادگی</FormLabel>
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
              name="fatherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام پدر</FormLabel>
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
              name="nationalId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>کد ملی</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Hash className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input {...field} className="pr-10" disabled={loading} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تاریخ تولد</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input {...field} type="date" className="pr-10" disabled={loading} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شهرستان</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="pr-10">
                        <School className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <SelectValue placeholder="انتخاب شهرستان" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {KURDISTAN_CITIES.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>آموزشگاه</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <School className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input {...field} className="pr-10" disabled={loading} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="term"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ترم</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="انتخاب ترم" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TERMS.map((term) => (
                        <SelectItem key={term} value={term.toString()}>
                          {term}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شماره موبایل</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input {...field} type="tel" className="pr-10" disabled={loading} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شماره ثابت</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input {...field} type="tel" className="pr-10" disabled={loading} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ایمیل</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input {...field} type="email" className="pr-10" disabled={loading} />
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
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'لطفا صبر کنید...' : 'ثبت نام'}
          </Button>
        </form>
      </Form>
    </>
  );
}