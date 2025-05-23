import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { editCompany } from '../api';

export const useEditCompany = () =>
  useMutation({
    mutationFn: editCompany,
    onSuccess: () => {
      toast.success('Компания успешно изменена!');
    },
    onError: () => {
      toast.error('Произошла ошибка!');
    },
  });
