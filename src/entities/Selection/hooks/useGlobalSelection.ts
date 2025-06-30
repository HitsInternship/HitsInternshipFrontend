import { useQuery } from '@tanstack/react-query';

import { getGlobalSelection } from '@/entities/Selection/api';
import { GetSelectionsParams } from '@/entities/Selection/api/getGlobalSelection.ts';

export const useGlobalSelection = (params: GetSelectionsParams, id?: string) =>
  useQuery({
    queryFn: () =>
      getGlobalSelection({
        params: { selectionId: id!, searchParams: params },
      }),
    queryKey: [
      'globalSelection',
      id,
      params.groupNumber,
      params.status,
      params.semester,
    ],
    select: (data) => data.data.selections,
    enabled: !!id,
    staleTime: Infinity,
    gcTime: 3 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
