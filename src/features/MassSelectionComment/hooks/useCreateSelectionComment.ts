import { useMutation } from '@tanstack/react-query';

import { createSelectionComment } from '../api';

export interface UseCreateSelectionCommentParams {
  onSuccess: () => void;
  onError: () => void;
}

export const useCreateSelectionComment = ({
  onSuccess,
  onError,
}: UseCreateSelectionCommentParams) =>
  useMutation({
    mutationFn: createSelectionComment,
    onSuccess,
    onError,
  });
