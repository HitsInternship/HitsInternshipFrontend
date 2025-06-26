import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { changePassword } from '../api/changePassword';

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    onError: () => {
      toast.error('ошибка');
    },
    onSuccess: () => {
      toast.success('Пароль изменен');
    },
  });
};
