import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { editPosition } from '../api/editPosition';

export const useEditPosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editPosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['positions'] });
      toast.success('Позиция успешно изменена!');
    },
    onError: () => {
      toast.error('Произошла ошибка!');
    },
  });
};
