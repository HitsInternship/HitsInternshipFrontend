import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { resetPasswordConfirm } from '../api/resetPasswordConfirm';

export const useResetPasswordConfirm = () => {
  return useMutation({
    mutationFn: resetPasswordConfirm,
    onError: () => {
      toast.error('ошибка');
    },
  });
};
