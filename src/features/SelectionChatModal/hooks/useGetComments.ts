import { useQuery } from '@tanstack/react-query';

import { getSelectionComments } from '../api';

export const useGetComments = (selectionId: string, isModalOpen: boolean) =>
  useQuery({
    queryFn: () =>
      getSelectionComments({ params: { selectionId: selectionId } }),
    queryKey: ['selections', selectionId],
    select: (data) => data.data,
    enabled: !!selectionId && isModalOpen,
  });
