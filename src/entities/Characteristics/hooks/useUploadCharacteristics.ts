import { useMutation, useQueryClient } from '@tanstack/react-query';

import { uploadCharacteristics } from '../api';

export const useUploadCharacteristics = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { idPractice: string; formPhoto: File }>({
    mutationFn: ({ idPractice, formPhoto }) =>
      uploadCharacteristics(idPractice, formPhoto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-practices'] });
    },
  });
};
