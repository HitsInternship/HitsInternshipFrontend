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
      lastSemesterId: string;
      streamId: string;
      diaryPatternFile: File;
      characteristicsPatternFile: File;
    }
  >({
    mutationFn: ({
      practiceType,
      semesterId,
      lastSemesterId,
      streamId,
      diaryPatternFile,
      characteristicsPatternFile,
    }) =>
      createPractice(
        practiceType,
        semesterId,
        lastSemesterId,
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
