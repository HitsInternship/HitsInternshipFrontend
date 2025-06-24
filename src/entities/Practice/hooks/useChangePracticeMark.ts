import { useMutation, useQueryClient } from '@tanstack/react-query';

import { changePracticeMark } from '../api/changePracticeMark';

export const useChangePracticeMark = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { practiceId: string; mark: number }>({
    mutationFn: ({ practiceId, mark }) =>
      changePracticeMark({ practiceId, mark }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['practice'],
      });
    },
  });
};
