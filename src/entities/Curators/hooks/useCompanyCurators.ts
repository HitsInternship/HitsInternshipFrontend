import { useQuery } from '@tanstack/react-query';

import { getCompanyCurators } from '@/entities/Curators/api';

export const useCompanyCurators = (companyId: string) =>
  useQuery({
    queryFn: () => getCompanyCurators({ params: { companyId: companyId } }),
    queryKey: ['curators', companyId],
    enabled: !!companyId,
    select: (data) => data.data,
    staleTime: Infinity,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
