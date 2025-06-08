import { useMutation } from '@tanstack/react-query';

import { editStudentInfo } from '../api';

export const useEditStudentInfo = (
  onSuccess?: () => void,
  onError?: () => void,
) =>
  useMutation({
    mutationFn: editStudentInfo,
    onSuccess,
    onError,
  });
