import { useQuery } from '@tanstack/react-query';

import { getMySelection } from '@/entities/Selection/api/getMySelection.ts';

export const useMySelection = () =>
  useQuery({
    queryFn: () => getMySelection({}),
    queryKey: ['my-selection'],
    select: (data) => data.data,
  });
