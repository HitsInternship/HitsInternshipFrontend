import { useQuery } from '@tanstack/react-query';

import { getSelections, GetSelectionsParams } from '../api';

export const useSelections = (params: GetSelectionsParams, enabled: boolean) =>
  useQuery({
    queryKey: [
      'selections',
      params.groupNumber,
      params.isArchive,
      params.status,
      params.semester,
    ],
    queryFn: () => getSelections({ params: params }),
    select: (data) => data.data,
    enabled: enabled,
  });
