import { useQuery } from '@tanstack/react-query';

import { getGlobalSelections } from '../api';

export const useGlobalSelections = (archived: boolean) =>
  useQuery({
    queryFn: () => getGlobalSelections({ params: { isArchived: archived } }),
    queryKey: ['globalSelections', archived],
    select: (data) => data.data,
    staleTime: Infinity,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
