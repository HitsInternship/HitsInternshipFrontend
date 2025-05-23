import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateCompanyStatus } from '../api';

export const useEditCompanyStatus = () =>
  useMutation({
    mutationFn: updateCompanyStatus,
    onSuccess: () => {
      toast.success('Статус успешно изменен!');
    },
    onError: () => {
      toast.error('Произошла ошибка!');
    },
  });
