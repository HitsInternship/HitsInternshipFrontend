import * as z from 'zod';

export const studentSchema = z.object({
  surname: z.string().min(1, 'Фамилия обязательна'),
  name: z.string().min(1, 'Имя обязательно'),
  middlename: z.string().optional(),
  email: z.string().email('Некорректный email').min(1, 'Email обязателен'),
  phone: z.string().min(1, 'Номер телефона обязателен'),
  isHeadMan: z.boolean(),
});

export type StudentFormData = z.infer<typeof studentSchema>;
