import { useMutation, useQueryClient } from '@tanstack/react-query';

import { uploadPracticeDiary } from '../api';

export const useUploadPracticeDiary = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { idPractice: string; formPhoto: File }>({
    mutationFn: ({ idPractice, formPhoto }) =>
      uploadPracticeDiary(idPractice, formPhoto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-practices'] });
    },
  });
};
