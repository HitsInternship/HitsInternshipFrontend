import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createDeanMember } from '../api/createDeanMember';

export const useCreateDeanMember = () => {
  return useMutation({
    mutationFn: createDeanMember,
    onSuccess: () => {
      toast.success('Сотрудник создан');
    },
    onError: () => {
      toast.error('Произошла ошибка!');
    },
  });
};
