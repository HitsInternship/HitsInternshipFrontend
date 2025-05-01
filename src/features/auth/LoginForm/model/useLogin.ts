import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { login } from '@/features/auth/LoginForm/model/login.ts';

export const useLogin = () =>
  useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success('Авторизация прошла успешно!');
    },
    onError: () => {
      toast.error('Произошла ошибка!');
    },
  });
