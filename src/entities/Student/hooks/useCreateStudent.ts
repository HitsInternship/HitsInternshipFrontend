import { useMutation } from '@tanstack/react-query';

import { createStudent } from '../api';

export const useCreateStudent = (
  onSuccess?: () => void,
  onError?: () => void,
) =>
  useMutation({
    mutationFn: createStudent,
    onSuccess,
    onError,
  });
