import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Edit2, Building, SquarePen } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Textarea,
} from '@/shared/ui';
import { useEditCompany } from '@/entities/Company';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { FormField } from '@/shared/ui/form.tsx';
import { Company } from '@/entities/Company/models';

const updateCompanySchema = z.object({
  name: z
    .string()
    .min(1, 'Название компании обязательно')
    .max(100, 'Название не должно превышать 100 символов'),
  description: z.string().max(500, 'Описание не должно превышать 500 символов'),
});

type UpdateCompanyFormData = z.infer<typeof updateCompanySchema>;

interface EditCompanyModalProps {
  company: Company;
}

export const EditCompanyDialog = ({ company }: EditCompanyModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<UpdateCompanyFormData>({
    resolver: zodResolver(updateCompanySchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  useEffect(() => {
    if (company) {
      form.reset({
        name: company.name || '',
        description: company.description || '',
      });
    }
  }, [company, form]);

  const { mutate: updateCompany, isPending } = useEditCompany({
    onSuccess: () => {
      setIsModalOpen(false);
      toast.success('Данные о компании обновлены успешно');
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
    onError: () => {
      toast.error('Не удалось обновить данные о компании');
    },
  });

  const onSubmit = (data: UpdateCompanyFormData) => {
    updateCompany({ params: { companyId: company.id, dto: data } });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (company) {
      form.reset({
        name: company.name || '',
        description: company.description || '',
      });
    }
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeModal();
        }
      }}
    >
      <DialogTrigger asChild onClick={() => setIsModalOpen(true)}>
        <Button variant='ghost'>
          <SquarePen className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <div className='p-2 bg-orange-100 rounded-lg'>
              <Building className='h-5 w-5 text-orange-600' />
            </div>
            Редактирование компании
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название компании *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Введите название компании'
                      {...field}
                      disabled={isPending}
                    />
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
                      placeholder='Введите описание компании (необязательно)'
                      rows={3}
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end gap-2 pt-4'>
              <Button
                type='button'
                variant='outline'
                onClick={closeModal}
                disabled={isPending}
              >
                Отмена
              </Button>
              <Button type='submit' disabled={isPending}>
                {isPending ? (
                  <>
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2' />
                    Сохранение...
                  </>
                ) : (
                  <>
                    <Edit2 className='mr-2 h-4 w-4' />
                    Сохранить
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
