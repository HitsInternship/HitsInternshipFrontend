import { IVacancyList, VacancyFilters } from '../models';

import { api } from '@/shared/api';

export const getVacancies = async (
  filters: VacancyFilters,
): Promise<IVacancyList> => {
  const { data } = await api.get<IVacancyList>(`/api/vacancies`, {
    params: {
      ...filters,
    },
  });

  return data;
};
