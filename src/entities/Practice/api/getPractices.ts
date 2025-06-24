import { Practice } from '../models/types';

import { api } from '@/shared/api';

export const getPractices = async ({
  globalPracticeId,
  groupId,
  companyId,
  hasMark,
}: {
  globalPracticeId: string;
  groupId?: string;
  companyId?: string;
  hasMark?: boolean;
}): Promise<Practice[]> => {
  const params = new URLSearchParams({
    globalPracticeId,
  });

  if (groupId) params.append('groupId', groupId);
  if (companyId) params.append('companyId', companyId);
  if (hasMark !== undefined) params.append('hasMark', String(hasMark));

  const { data } = await api.get<Practice[]>(
    `/api/practice/search?${params.toString()}`,
  );

  return data;
};
