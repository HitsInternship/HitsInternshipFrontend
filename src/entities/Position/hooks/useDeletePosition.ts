import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deletePositions } from '../api/deletePositions';

export const useDeletePosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePositions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['positions'] });
      toast.success('Позиция удалена');
    },
    onError: () => {
      toast.error('Произошла ошибка!');
    },
  });
};
