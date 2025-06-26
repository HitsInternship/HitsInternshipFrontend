import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { sendApplicationTemplate } from '../api/sendApplicationFile copy';

export const useSendApplicationTamplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendApplicationTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tamplate'] });
    },
    onError: () => {
      toast.error('Ошибка загрузки файла');
    },
  });
};
