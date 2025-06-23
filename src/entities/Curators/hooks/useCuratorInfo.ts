import { useQuery } from '@tanstack/react-query';

import { getCuratorInfo } from '@/entities/Curators/api';

export const useCuratorInfo = (isCurator: boolean) =>
  useQuery({
    queryFn: () => getCuratorInfo({}),
    queryKey: ['curatorInfo'],
    select: (data) => data.data,
    enabled: isCurator,
    staleTime: Infinity,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
