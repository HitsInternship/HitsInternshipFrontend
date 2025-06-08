import { IVacancyInfo } from '../models';

import { api } from '@/shared/api';

export const getVacancy = async (id: string): Promise<IVacancyInfo> => {
  const { data } = await api.get<IVacancyInfo>(`/api/vacancies/${id}`, {});

  return data;
};
