import { api } from '@/shared/api';

export const deletePositions = async (id: string): Promise<void> => {
  await api.delete(`/api/positions/${id}`, {});
};
