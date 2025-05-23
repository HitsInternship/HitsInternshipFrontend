import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import {
  companyPersonFormSchema,
  CompanyPersonFormValues,
  ICompanyPersonFormProps,
} from '../model';
import { ICreateCompanyPersonDTO } from '../model';
import { useCreateCompanyPerson } from '../hooks';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form.tsx';
import { Button, Input } from '@/shared/ui';
import { Checkbox } from '@/shared/ui/checkbox';
import { ROUTER_PATHS } from '@/shared/consts';

export const CompanyPersonForm = ({ companyId }: ICompanyPersonFormProps) => {
  const navigate = useNavigate();

  const { mutate, isPending } = useCreateCompanyPerson();

  const form = useForm<CompanyPersonFormValues>({
    resolver: zodResolver(companyPersonFormSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      phone: '',
      telegram: '',
      isCurator: false,
    },
  });

  const onSubmit = (values: CompanyPersonFormValues) => {
    const personData: ICreateCompanyPersonDTO = {
      userRequest: {
        name: values.name,
        surname: values.surname,
        email: values.email,
      },
      userId: '',
      phone: values.phone,
      telegram: values.telegram,
      isCurator: values.isCurator,
    };

    mutate({ params: { companyId: companyId, dto: personData } });

    navigate(ROUTER_PATHS.COMPANY(companyId));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 max-w-2xl'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input placeholder='Введите имя' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='surname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Фамилия</FormLabel>
                <FormControl>
                  <Input placeholder='Введите фамилию' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='email@example.com'
                  type='email'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Телефон</FormLabel>
                <FormControl>
                  <Input
                    placeholder='+7 (999) 123-45-67'
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormDescription>Номер телефона для связи</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='telegram'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telegram</FormLabel>
                <FormControl>
                  <Input
                    placeholder='@username'
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormDescription>Имя пользователя в Telegram</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='isCurator'
          render={({ field }) => (
            <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel>Куратор</FormLabel>
                <FormDescription>
                  Отметьте, если этот представитель является куратором от
                  компании
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className='flex gap-4'>
          <Button
            type='button'
            variant='outline'
            onClick={() => navigate(-1)}
            disabled={isPending}
          >
            Отмена
          </Button>
          <Button type='submit' disabled={isPending}>
            {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Добавить представителя
          </Button>
        </div>
      </form>
    </Form>
  );
};
