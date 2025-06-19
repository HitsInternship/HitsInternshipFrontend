import { useMutation } from '@tanstack/react-query';

import { editCompany } from '../api';

import { BaseMutationParams } from '@/shared/api';

export const useEditCompany = ({ onSuccess, onError }: BaseMutationParams) =>
  useMutation({
    mutationFn: editCompany,
    onSuccess,
    onError,
  });
