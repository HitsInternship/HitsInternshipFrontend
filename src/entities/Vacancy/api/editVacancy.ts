import { CreateVacancyFormData } from '../models';

import { api } from '@/shared/api';

export const editVacancy = async ({
  payload,
  id,
}: {
  payload: CreateVacancyFormData;
  id: string;
}): Promise<void> => {
  await api.put(`/api/vacancies/${id}`, payload);
};
