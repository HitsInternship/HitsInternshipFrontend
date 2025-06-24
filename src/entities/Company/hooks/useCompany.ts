import { useQuery } from '@tanstack/react-query';

import { getCompany } from '@/entities/Company/api';

export const useCompany = (companyId: string) =>
  useQuery({
    queryKey: ['company', companyId],
    queryFn: () => getCompany({ params: { id: companyId } }),
    select: (data) => data.data,
    staleTime: Infinity,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
