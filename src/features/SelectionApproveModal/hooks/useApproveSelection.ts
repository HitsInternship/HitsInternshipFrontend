import { useMutation } from '@tanstack/react-query';

import { approveSelection } from '@/features/SelectionApproveModal/api';

export interface UseApproveSelectionProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useApproveSelection = ({
  onSuccess,
  onError,
}: UseApproveSelectionProps) =>
  useMutation({
    mutationFn: approveSelection,
    onError,
    onSuccess,
  });
