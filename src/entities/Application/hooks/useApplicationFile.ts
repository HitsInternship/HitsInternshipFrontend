import { useMutation } from '@tanstack/react-query';

import { getApplicationFile } from '../api/getApplicationFile';

export const useApplicationFile = () =>
  useMutation({
    mutationFn: getApplicationFile,
  });
