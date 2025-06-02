import { useQuery } from '@tanstack/react-query';

import { getStudentsByStream } from '../api';

export const useStudentsByStream = (streamId?: string) =>
  useQuery({
    queryFn: () => getStudentsByStream({ params: { streamId: streamId! } }),
    queryKey: ['students', streamId],
    enabled: !!streamId,
    gcTime: 3 * 60 * 1000,
    select: (data) => data.data,
  });
