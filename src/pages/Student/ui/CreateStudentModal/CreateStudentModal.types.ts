import * as z from 'zod';

import { EStudentStatus } from '@/entities/Student';

export const studentSchema = z.object({
  surname: z.string().min(1, 'Фамилия обязательна'),
  name: z.string().min(1, 'Имя обязательно'),
  middlename: z.string().optional(),
  email: z.string().email('Некорректный email').min(1, 'Email обязателен'),
  phone: z.string().min(1, 'Номер телефона обязателен'),
  status: z.nativeEnum(EStudentStatus),
  groupId: z.string(),
  isHeadMan: z.boolean(),
});

export type StudentFormData = z.infer<typeof studentSchema>;
