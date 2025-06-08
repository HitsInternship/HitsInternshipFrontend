import { CreateVacancyFormData } from '../models';

import { api } from '@/shared/api';

export const createVacancy = async (
  payload: CreateVacancyFormData,
): Promise<void> => {
  await api.post('/api/vacancies', payload);
};
