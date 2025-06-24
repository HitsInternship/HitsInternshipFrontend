import { PotentialPractice } from '../models';

import { api } from '@/shared/api';

export const getPotentialPractices = async ({
  lastSemesterId,
  streamId,
  groupId,
  oldCompanyId,
  oldPositionId,
}: {
  lastSemesterId: string;
  streamId: string;
  groupId?: string;
  oldCompanyId?: string;
  oldPositionId?: string;
}): Promise<PotentialPractice[]> => {
  const params = new URLSearchParams({
    lastSemesterId,
    streamId,
  });

  if (groupId) params.append('groupId', groupId);
  if (oldCompanyId) params.append('oldCompanyId', oldCompanyId);
  if (oldPositionId) params.append('oldPositionId', oldPositionId);

  const { data } = await api.get<PotentialPractice[]>(
    `/api/practice/potential?${params.toString()}`,
  );

  return data;
};
