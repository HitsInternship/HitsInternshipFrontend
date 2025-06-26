import { useQuery } from '@tanstack/react-query';

import { getSelection } from '@/entities/Selection/api/getSelection.ts';

export const useSelection = (selectionId: string) =>
  useQuery({
    queryFn: () => getSelection({ params: { selectionId: selectionId } }),
    queryKey: ['selection', selectionId],
    select: (data) => data.data,
    enabled: !!selectionId,
  });
