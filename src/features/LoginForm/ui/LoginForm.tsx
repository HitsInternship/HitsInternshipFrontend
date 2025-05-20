import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useLogin } from '../hooks';
import { LoginFormValues, loginSchema } from '../model';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Input,
  Button,
} from '@/shared/ui';

export const LoginForm = () => {
  const { mutate, isPending } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    mutate({ params: data });
  };

  return (
    <Card className='min-w-[400px]'>
      <CardHeader>
        <CardTitle>Вход в аккаунт</CardTitle>
        <CardDescription>Введите данные для входа в аккаунт</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-6'>
            <div className='grid gap-3'>
              <Label htmlFor='email'>Эл. почта</Label>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id='email'
                    type='email'
                    placeholder='m@example.com'
                  />
                )}
              />
              {errors.email && (
                <p className='text-sm text-red-500'>{errors.email.message}</p>
              )}
            </div>
            <div className='grid gap-3'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Пароль</Label>
              </div>
              <Controller
                name='password'
                control={control}
                render={({ field }) => (
                  <Input {...field} id='password' type='password' />
                )}
              />
              {errors.password && (
                <p className='text-sm text-red-500'>
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className='flex flex-col gap-3'>
              <Button type='submit' className='w-full'>
                {isPending ? 'Обработка...' : 'Войти'}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
