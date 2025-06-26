import { useQuery } from '@tanstack/react-query';

import { getApplicationTemplate } from '../api/getApplicationTemplate';

export const useApplicationTamplate = () =>
  useQuery({
    queryKey: ['tamplate'],
    queryFn: getApplicationTemplate,
  });
