import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { downloadInternsByCompany } from '../api/downloadInternsByCompany';

export const useDownloadInternsByCompany = () => {
  return useMutation({
    mutationFn: downloadInternsByCompany,

    onError: () => {
      toast.error('Произошла ошибка!');
    },
  });
};
