import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateApplicationStatus } from '../api/updateApplicationStatus';
import { EApplicationStatus } from '../models/types';

export const useUpdateApplicationStatus = () => {
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: EApplicationStatus }) =>
      updateApplicationStatus(id, status),

    onError: () => {
      toast.error('Произошла ошибка');
    },
  });
};
