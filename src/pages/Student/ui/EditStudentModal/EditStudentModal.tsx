import { Edit, LoaderCircle } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { StudentFormData, studentSchema } from './EditStudentModal.types';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from '@/shared/ui';
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu.tsx';
import { Checkbox } from '@/shared/ui/checkbox.tsx';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form.tsx';
import {
  useStudent,
  useEditStudentInfo,
  EditStudentDTO,
} from '@/entities/Student';

export interface EditStudentModalProps {
  studentId: string;
}

export const EditStudentModal = ({ studentId }: EditStudentModalProps) => {
  const { data: student, isLoading: isStudentLoading } = useStudent(studentId);
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['students'] });
    toast.success('Студент добавлен успешно');
  };

  const onError = () => {
    toast.error('Произошла ошибка');
  };

  const { mutate, isPending } = useEditStudentInfo(onSuccess, onError);

  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: student
      ? {
          surname: student.surname,
          name: student.name,
          middlename: student.middlename,
          email: student.email,
          phone: student.phone,
          isHeadMan: student.isHeadMan,
        }
      : {
          surname: '',
          name: '',
          middlename: '',
          email: '',
          phone: '',
          isHeadMan: false,
        },
  });

  const onSubmit = (data: StudentFormData) => {
    const dto: EditStudentDTO = {
      studentId: studentId,
      name: data.name,
      surnamename: data.name,
      middlename: data.middlename ?? '',
      phone: data.phone,
      email: data.email,
      isHeadMan: data.isHeadMan,
    };
    mutate({ params: dto });
  };

  if (isStudentLoading) {
    return (
      <div className='flex items-center justify-center h-[400px] w-full'>
        <LoaderCircle className='h-8 w-8 animate-spin text-black-500 dark:text-gray-300' />
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Edit className='mr-2 h-4 w-4' />
          Редактировать
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Редактировать студента</DialogTitle>
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
