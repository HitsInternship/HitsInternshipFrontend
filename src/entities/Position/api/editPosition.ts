import { CreatePositionFormData } from '../models';

import { api } from '@/shared/api';

export const editPosition = async ({
  payload,
  id,
}: {
  payload: CreatePositionFormData;
  id: string;
}): Promise<void> => {
  await api.put(`/api/positions/${id}`, payload);
};
