import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createVacancy } from '../api/createVacancy';

export const useCreateVacancy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVacancy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] });
      toast.success('Вакансия успешно создана!');
    },
    onError: () => {
      toast.error('Произошла ошибка :(');
    },
  });
};
