import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { resetPassword } from '../api/resetPassword';

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
    onError: () => {
      toast.error('ошибка');
    },
  });
};
