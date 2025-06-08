import { IDeleteVacancy } from './interfaces';

import { api } from '@/shared/api';

export const deleteVacancy = async ({
  id,
  isArchive,
}: IDeleteVacancy): Promise<void> => {
  await api.delete(`/api/vacancies/${id}`, { data: { isArchive } });
};
