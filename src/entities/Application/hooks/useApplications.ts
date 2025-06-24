import { useMutation } from '@tanstack/react-query';

import { getApplications } from '../api/getApplications';

export const useApplications = () => {
  return useMutation({
    mutationFn: getApplications,
  });
};
