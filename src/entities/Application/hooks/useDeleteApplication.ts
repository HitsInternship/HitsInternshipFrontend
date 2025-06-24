import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteApplication } from '../api/createApplication copy';

export const useDeleteApplication = () =>
  useMutation({
    mutationFn: deleteApplication,
    onError() {
      toast.error('Не удалось загрузить вакансию');
    },
  });
