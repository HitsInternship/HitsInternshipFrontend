import * as z from 'zod';

export const companyPersonFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Имя должно содержать не менее 2 символов',
  }),
  surname: z.string().min(2, {
    message: 'Фамилия должна содержать не менее 2 символов',
  }),
  email: z.string().email({
    message: 'Введите корректный email',
  }),
  phone: z.string(),
  telegram: z.string(),
  isCurator: z.boolean(),
});

export type CompanyPersonFormValues = z.infer<typeof companyPersonFormSchema>;
