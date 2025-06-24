import { useMutation } from '@tanstack/react-query';

import { createApplication } from '../api/createApplication';

export const useCreateApplication = () =>
  useMutation({
    mutationFn: createApplication,
  });
