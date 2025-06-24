import { api } from '@/shared/api';

export const sendComment = async (
  id: string,
  content: string,
): Promise<void> => {
  await api.post(`/api/${id}/comments`, content);
};
