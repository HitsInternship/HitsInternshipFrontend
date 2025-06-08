import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { editVacancy } from '../api/editVacancy';

export const useEditVacancy = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editVacancy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] });
      queryClient.invalidateQueries({ queryKey: ['vacancy', id] });
      toast.success('Вакансия успешно изменена!');
    },
    onError: () => {
      toast.error('Произошла ошибка!');
    },
  });
};
