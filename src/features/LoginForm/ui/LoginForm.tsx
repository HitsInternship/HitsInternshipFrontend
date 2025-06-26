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
import { ResetPassword } from '@/features/ResetPassword';

export const LoginForm = () => {
  const { mutate, isPending } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: '',
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
          <div className='flex flex-col gap-6 mb-2'>
            <div className='grid gap-3'>
              <Label htmlFor='login'>Эл. почта</Label>
              <Controller
                name='login'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id='login'
                    type='email'
                    placeholder='m@example.com'
                  />
                )}
              />
              {errors.login && (
                <p className='text-sm text-red-500'>{errors.login.message}</p>
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
        <ResetPassword />
      </CardContent>
    </Card>
  );
};
