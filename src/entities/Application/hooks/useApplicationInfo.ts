import { useMutation } from '@tanstack/react-query';

import { getApplicationInfo } from '../api/getApplicationInfo';

export const useApplicationInfo = () =>
  useMutation({
    mutationFn: getApplicationInfo,
  });
