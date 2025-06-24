import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { respond } from '../api/respond';

export const useRespondVacancy = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: respond,
    onSuccess: () => {
      toast.success('Отклик отправлен');
      queryClient.invalidateQueries({ queryKey: ['vacancy', id] });
    },
    onError: () => {
      toast.error('Произошла ошибка :(');
    },
  });
};
