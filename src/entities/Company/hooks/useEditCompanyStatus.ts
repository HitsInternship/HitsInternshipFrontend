import { useMutation } from '@tanstack/react-query';

import { updateCompanyStatus } from '../api';

import { BaseMutationParams } from '@/shared/api';

export const useEditCompanyStatus = ({
  onSuccess,
  onError,
}: BaseMutationParams) =>
  useMutation({
    mutationFn: updateCompanyStatus,
    onSuccess,
    onError,
  });
