import { useMutation } from '@tanstack/react-query';

import { addSelectionComment } from '../api';

export interface UseAddCommentParams {
  onSuccess: () => void;
  onError: () => void;
}

export const useAddComment = ({ onSuccess, onError }: UseAddCommentParams) =>
  useMutation({
    mutationFn: addSelectionComment,
    onSuccess,
    onError,
  });
