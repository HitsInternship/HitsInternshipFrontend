import * as z from 'zod';

export const companyFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Название компании должно содержать не менее 2 символов',
  }),
  description: z.string().optional(),
  status: z.enum(['Partner', 'FormerPartner', 'PotentialPartner']),
});

export type CompanyFormValues = z.infer<typeof companyFormSchema>;
