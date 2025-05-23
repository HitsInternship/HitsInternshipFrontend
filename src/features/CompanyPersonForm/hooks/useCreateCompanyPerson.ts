import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { addCompanyPerson } from '../api';

export const useCreateCompanyPerson = () =>
  useMutation({
    mutationFn: addCompanyPerson,
    onSuccess: () => {
      toast.success('Представитель компании успешно добавлен!');
    },
    onError: () => {
      toast.error('Произошла ошибка!');
    },
  });
