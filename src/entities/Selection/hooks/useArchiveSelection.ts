import { useMutation } from '@tanstack/react-query';

import { archiveGlobalSelection } from '../api';

import { BaseMutationParams } from '@/shared/api';

export const useArchiveSelection = ({
  onSuccess,
  onError,
}: BaseMutationParams) =>
  useMutation({
    mutationFn: archiveGlobalSelection,
    onSuccess,
    onError,
  });
