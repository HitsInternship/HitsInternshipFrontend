import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Поле обязательно к заполнению')
    .max(256, 'Слишком длинный email')
    .email('Поле содержит недопустимые символы'),
  password: z
    .string({ required_error: 'Поле обязательно для ввода' })
    .min(6, 'Пароль должен содержать от 6 до 128 символов')
    .max(128, 'Пароль должен содержать от 6 до 128 символов')
    .regex(
      /^[a-zA-Zа-яА-Я0-9\W_]*$/,
      'Пароль может содержать только буквы, цифры и специальные символы',
    ),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
