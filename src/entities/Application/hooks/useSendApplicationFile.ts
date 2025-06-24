import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { sendApplicationFile } from '../api/sendApplicationFile';

export const useSendApplicationFile = () =>
  useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) =>
      sendApplicationFile(id, file),

    onError: () => {
      toast.error('Ошибка загрузки файла');
    },
  });
