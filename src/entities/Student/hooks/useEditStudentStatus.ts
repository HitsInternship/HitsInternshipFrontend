import { useMutation } from '@tanstack/react-query';

import { editStudentStatus } from '../api';

import { BaseMutationParams } from '@/shared/api';

export const useEditStudentStatus = ({
  onSuccess,
  onError,
}: BaseMutationParams) =>
  useMutation({
    mutationFn: editStudentStatus,
    onSuccess,
    onError,
  });
