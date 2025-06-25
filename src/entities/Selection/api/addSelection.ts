import { api } from '@/shared/api';

export const addSelection = async (
  semesterId: string,
  streamId: string,
  deadline: string,
) => {
  await api.post(`/api/selection/add`, {
    semesterId,
    streamId,
    deadline,
  });
};
