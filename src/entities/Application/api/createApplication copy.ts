import { api } from '@/shared/api';

export const deleteApplication = async (id: string): Promise<void> => {
  await api.delete(`/applications/${id}?isArchive=false`);
};
