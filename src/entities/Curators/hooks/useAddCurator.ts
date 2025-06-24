import { useMutation } from '@tanstack/react-query';

import { addCompanyCurator } from '../api';

import { BaseMutationParams } from '@/shared/api';

export const useAddCurator = ({ onSuccess, onError }: BaseMutationParams) =>
  useMutation({
    mutationFn: addCompanyCurator,
    onSuccess,
    onError,
  });
