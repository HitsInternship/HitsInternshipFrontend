import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addDiaryComment } from '@/entities/Characteristics/api';

export const useAddDiaryComment = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { diaryId: string; comment: string }>({
    mutationFn: ({ diaryId, comment }) => addDiaryComment(diaryId, comment),
    onSuccess: (_, { diaryId }) => {
      queryClient.invalidateQueries({ queryKey: ['student-diaries'] });
      queryClient.invalidateQueries({ queryKey: ['student-diaries', diaryId] });
    },
  });
};
