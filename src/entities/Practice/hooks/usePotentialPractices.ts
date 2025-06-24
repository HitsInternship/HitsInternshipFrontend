import { useQuery } from '@tanstack/react-query';

import { PotentialPractice } from '../models';
import { getPotentialPractices } from '../api/getPotentialPractices';

export const usePotentialPractices = (
  lastSemesterId: string | null,
  streamId: string | null,
  groupId?: string,
  oldCompanyId?: string,
  oldPositionId?: string,
) => {
  return useQuery<PotentialPractice[]>({
    queryKey: [
      'potential-practices',
      lastSemesterId,
      streamId,
      groupId,
      oldCompanyId,
      oldPositionId,
    ],
    queryFn: () =>
      getPotentialPractices({
        lastSemesterId: lastSemesterId!,
        streamId: streamId!,
        groupId,
        oldCompanyId,
        oldPositionId,
      }),
    enabled: !!lastSemesterId && !!streamId,
    gcTime: 5 * 60 * 1000,
    staleTime: 30 * 1000,
  });
};
