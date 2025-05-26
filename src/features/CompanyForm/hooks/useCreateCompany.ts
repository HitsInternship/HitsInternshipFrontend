import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createCompany } from '../api';

export const useCreateCompany = () =>
  useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      toast.success('Компания успешно создана!');
    },
    onError: () => {
      toast.error('Произошла ошибка!');
    },
  });
