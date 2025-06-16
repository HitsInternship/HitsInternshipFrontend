import { api } from '@/shared/api';

export const respond = async (vacancyId: string): Promise<void> => {
  await api.post(`/api/vacancies/${vacancyId}/respond`);
};
