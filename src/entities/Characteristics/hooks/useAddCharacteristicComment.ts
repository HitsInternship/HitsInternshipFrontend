import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addCharacteristicComment } from '@/entities/Diary/api';

export const useAddCharacteristicComment = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    { characteristicId: string; comment: string }
  >({
    mutationFn: ({ characteristicId, comment }) =>
      addCharacteristicComment(characteristicId, comment),
    onSuccess: (_, { characteristicId }) => {
      queryClient.invalidateQueries({ queryKey: ['student-characteristics'] });
      queryClient.invalidateQueries({
        queryKey: ['student-characteristics', characteristicId],
      });
    },
  });
};
