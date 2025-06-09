import { useQuery } from '@tanstack/react-query';

import { getSelections, GetSelectionsParams } from '../api';

export const useSelections = (params: GetSelectionsParams) =>
  useQuery({
    queryKey: [
      'selections',
      params.groupNumber,
      params.isArchive,
      params.status,
    ],
    queryFn: () => getSelections({ params: params }),
    select: (data) => data.data,
  });
