import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import {
  companyFormSchema,
  CompanyFormValues,
  ICompanyFormProps,
} from '../model';

import { Button } from '@/shared/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import {
  useCreateCompany,
  useEditCompany,
  useEditCompanyStatus,
} from '@/features/CompanyForm/hooks';
import { ROUTER_PATHS } from '@/shared/consts';

export const CompanyForm = ({ company, isEdit = false }: ICompanyFormProps) => {
  const navigate = useNavigate();

  const { mutate: createCompany, isPending: isCompanyCreating } =
    useCreateCompany();
  const { mutate: editCompany, isPending: isCompanyEditing } = useEditCompany();
  const { mutate: updateCompanyStatus, isPending: isStatusUpdating } =
    useEditCompanyStatus();

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: company?.name || '',
      description: company?.description || '',
      status: company?.status || 'PotentialPartner',
    },
  });

  async function onSubmit(values: CompanyFormValues) {
    if (isEdit && company) {
      const updateData: Omit<CompanyFormValues, 'status'> = {
        name: values.name,
        description: values.description,
      };
      editCompany({ params: { companyId: company.id, dto: updateData } });

      if (values.status !== company.status) {
        updateCompanyStatus({
          params: { companyId: company.id, status: company.status },
        });
      }
    } else {
      const createData: CompanyFormValues = {
        name: values.name,
        description: values.description,
        status: values.status,
      };

      createCompany({ params: createData });
    }
    navigate(ROUTER_PATHS.COMPANIES);
  }

  const isLoading = isCompanyCreating || isCompanyEditing || isStatusUpdating;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 max-w-2xl'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название компании</FormLabel>
              <FormControl>
                <Input placeholder='Введите название компании' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Введите описание компании'
                  className='resize-none min-h-[120px]'
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormDescription>
                Краткое описание компании и направления деятельности
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Статус</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Выберите статус компании' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='Partner'>Партнер</SelectItem>
                  <SelectItem value='FormerPartner'>Бывший партнер</SelectItem>
                  <SelectItem value='PotentialPartner'>
                    Потенциальный партнер
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Текущий статус сотрудничества с компанией
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex gap-4'>
          <Button
            type='button'
            variant='outline'
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            Отмена
          </Button>
          <Button type='submit' disabled={isLoading}>
            {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {isEdit ? 'Сохранить изменения' : 'Создать компанию'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
