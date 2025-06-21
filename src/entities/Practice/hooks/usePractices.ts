import { useQuery } from '@tanstack/react-query';

import { getPractices } from '../api/getPractices';
import { Practice } from '../models/types';

export const usePractices = (
  globalPracticeId: string,
  groupId?: string,
  companyId?: string,
  hasMark?: boolean,
) => {
  return useQuery<Practice[]>({
    queryKey: [
      'practice',
      'by-global-id',
      globalPracticeId,
      groupId,
      companyId,
      hasMark,
    ],
    queryFn: () =>
      getPractices({
        globalPracticeId,
        groupId,
        companyId,
        hasMark,
      }),
    enabled: !!globalPracticeId,
    gcTime: 5 * 60 * 1000,
  });
};
