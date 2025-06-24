import { EApplicationStatus } from '../models/types';

import { api } from '@/shared/api';

export const updateApplicationStatus = async (
  id: string,
  status: EApplicationStatus,
): Promise<void> => {
  await api.post<string>(
    `/applications/${id}/application-status?status=${status}`,
  );
};
