import { IVacancyList, IVacancy } from '../models';

import { api } from '@/shared/api';

export const getVacancies = async (): Promise<IVacancy[]> => {
  const { data } = await api.get<IVacancyList>(`/api/vacancies`, {});

  return data.vacancies;
};
