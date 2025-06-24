import { useMutation } from '@tanstack/react-query';

import { createCompany } from '../api';

import { BaseMutationParams } from '@/shared/api';

export const useCreateCompany = ({ onSuccess, onError }: BaseMutationParams) =>
  useMutation({
    mutationFn: createCompany,
    onSuccess,
    onError,
  });
