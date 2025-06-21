import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPractice } from '../api/createPractice';

export const useCreatePractice = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    {
      practiceType: string;
      semesterId: string;
      previousSemesterId: string;
      streamId: string;
      diaryPatternFile: File;
      characteristicsPatternFile: File;
    }
  >({
    mutationFn: ({
      practiceType,
      semesterId,
      previousSemesterId,
      streamId,
      diaryPatternFile,
      characteristicsPatternFile,
    }) =>
      createPractice(
        practiceType,
        semesterId,
        previousSemesterId,
        streamId,
        diaryPatternFile,
        characteristicsPatternFile,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['globalPractices'],
      });
    },
  });
};
