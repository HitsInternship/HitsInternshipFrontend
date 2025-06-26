import { useQuery } from '@tanstack/react-query';

import { getCompanies } from '../api';

export const useCompaniesList = (enabled: boolean | undefined = true) =>
  useQuery({
    queryFn: () => getCompanies({}),
    queryKey: ['companies'],
    select: (data) => data.data,
    staleTime: Infinity,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: enabled,
  });
