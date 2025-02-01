import * as z from 'zod';
import { KURDISTAN_CITIES } from '../constants';

export const profileUpdateSchema = z.object({
  firstName: z.string().min(2, 'نام باید حداقل 2 کاراکتر باشد'),
  lastName: z.string().min(2, 'نام خانوادگی باید حداقل 2 کاراکتر باشد'),
  city: z.enum(KURDISTAN_CITIES, {
    errorMap: () => ({ message: 'لطفا یک شهر معتبر انتخاب کنید' }),
  }),
  school: z.string().optional(),
  mobile: z.string().regex(/^09\d{9}$/, 'شماره موبایل نامعتبر است'),
  phone: z.string().optional(),
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;