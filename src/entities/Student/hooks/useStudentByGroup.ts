import { useQuery } from '@tanstack/react-query';

import { getStudentsByGroup } from '../api';

export const useStudentsByGroup = (groupId?: string) =>
  useQuery({
    queryFn: () => getStudentsByGroup({ params: { groupId: groupId! } }),
    queryKey: ['students', groupId],
    enabled: !!groupId,
    gcTime: 3 * 60 * 1000,
    select: (data) => data.data,
  });
