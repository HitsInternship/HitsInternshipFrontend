import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { getVacancies } from '../api/getVacancies';

export const useVacancies = () => {
  return useMutation({
    mutationFn: getVacancies,
    onError: () => {
      toast.error('Произошла ошибка!');
    },
  });
};
