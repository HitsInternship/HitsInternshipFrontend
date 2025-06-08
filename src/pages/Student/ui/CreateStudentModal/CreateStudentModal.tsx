import { UserPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { StudentFormData, studentSchema } from './CreateStudentModal.types';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { Checkbox } from '@/shared/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { useGroups } from '@/entities/Groups';
import { CreateStudentDTO, EInternshipStatus } from '@/entities/Student';
import { useCreateStudent } from '@/entities/Student';

export const CreateStudentModal = () => {
  const { data: groups, isLoading, error } = useGroups();
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['students'] });
    toast.success('Студент добавлен успешно');
  };

  const onError = () => {
    toast.error('Произошла ошибка');
  };

  const { mutate, isPending } = useCreateStudent(onSuccess, onError);

  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      surname: '',
      name: '',
      middlename: '',
      email: '',
      phone: '',
      status: undefined,
      groupId: '',
      isHeadMan: false,
    },
  });

  const onSubmit = (data: StudentFormData) => {
    const dto: CreateStudentDTO = {
      password: 'string',
      userRequest: {
        name: data.name,
        surname: data.surname,
        email: data.email,
      },
      middlename: data.middlename ?? '',
      phone: data.phone,
      isHeadMan: data.isHeadMan,
      status: data.status,
      internshipStatus: EInternshipStatus.InSearch,
      groupId: data.groupId,
    };
    mutate({ params: dto });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className='mr-2 h-4 w-4' />
          Добавить студента
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Добавить студента</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='surname'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Фамилия *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='middlename'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Отчество</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type='email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Телефон</FormLabel>
                    <FormControl>
                      <Input placeholder='+7 (999) 123-45-67' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Статус</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Выберите статус' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='InProcess'>Обучается</SelectItem>
                        <SelectItem value='OnAcademicLeave'>
                          Академический отпуск
                        </SelectItem>
                        <SelectItem value='Graduated'>Выпускник</SelectItem>
                        <SelectItem value='Expelled'>Отчислен</SelectItem>
                        <SelectItem value='Transfered'>Переведен</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='groupId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Номер группы</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Выберите группу' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoading && (
                          <SelectItem value='loading' disabled>
                            Загрузка...
                          </SelectItem>
                        )}
                        {error && (
                          <SelectItem value='error' disabled>
                            Ошибка загрузки
                          </SelectItem>
                        )}
                        {groups?.map((group) => (
                          <SelectItem key={group.id} value={group.id}>
                            {group.groupNumber}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='isHeadMan'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Староста группы</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end space-x-2 pt-4'>
              <Button type='submit' disabled={isPending}>
                {isPending ? 'Обработка' : 'Сохранить изменения'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
