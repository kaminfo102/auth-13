import * as z from 'zod';
import { KURDISTAN_CITIES, TERMS } from '../constants';

export const loginSchema = z.object({
  email: z.string().email('ایمیل نامعتبر است'),
  password: z.string().min(6, 'رمز عبور باید حداقل 6 کاراکتر باشد'),
});

export const registerSchema = z.object({
  firstName: z.string().min(2, 'نام باید حداقل 2 کاراکتر باشد'),
  lastName: z.string().min(2, 'نام خانوادگی باید حداقل 2 کاراکتر باشد'),
  fatherName: z.string().optional(),
  nationalId: z.string().length(10, 'کد ملی باید 10 رقم باشد'),
  birthDate: z.string(),
  city: z.enum(KURDISTAN_CITIES, {
    errorMap: () => ({ message: 'لطفا یک شهر معتبر انتخاب کنید' }),
  }),
  school: z.string().optional(),
  term: z.number().min(1).max(18),
  mobile: z.string().regex(/^09\d{9}$/, 'شماره موبایل نامعتبر است'),
  phone: z.string().optional(),
  email: z.string().email('ایمیل نامعتبر است'),
  password: z.string().min(6, 'رمز عبور باید حداقل 6 کاراکتر باشد'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;