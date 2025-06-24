import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { sendComment } from '../api/sendComment';

export const useSendComment = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ content }: { content: string }) => sendComment(id, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
    },
    onError: () => {
      toast.error('Произошла ошибка!');
    },
  });
};
