import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Building } from 'lucide-react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { useCreateCompany } from '@/entities/Company';
import { ECompanyStatus } from '@/entities/Company/models';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form.tsx';

const createCompanySchema = z.object({
  name: z
    .string()
    .min(1, 'Название компании обязательно')
    .max(100, 'Название не должно превышать 100 символов'),
  description: z.string().max(500, 'Описание не должно превышать 500 символов'),
  status: z.nativeEnum(ECompanyStatus, {
    required_error: 'Выберите статус компании',
  }),
});

type CreateCompanyFormData = z.infer<typeof createCompanySchema>;

const statusLabels = {
  [ECompanyStatus.Partner]: 'Партнер',
  [ECompanyStatus.FormerPartner]: 'Бывший партнер',
  [ECompanyStatus.PotentialPartner]: 'Потенциальный партнер',
};

export const CreateCompanyDialog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<CreateCompanyFormData>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      name: '',
      description: '',
      status: ECompanyStatus.Partner,
    },
  });

  const { mutate: createCompany, isPending } = useCreateCompany({
    onSuccess: () => {
      setIsModalOpen(false);
      form.reset();
      toast.success('Компания успешно создана');
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
    onError: () => {
      toast.error('Произошла ошибка');
    },
  });

  const onSubmit = (data: CreateCompanyFormData) => {
    createCompany({ params: data });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    form.reset();
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
      <DialogTrigger asChild>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className='mr-2 h-4 w-4' />
          Создать компанию
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <div className='p-2 bg-blue-100 rounded-lg'>
              <Building className='h-5 w-5 text-blue-600' />
            </div>
            Создание компании
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

            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Статус *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Выберите статус компании' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    Создание...
                  </>
                ) : (
                  <>
                    <Plus className='mr-2 h-4 w-4' />
                    Создать
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
