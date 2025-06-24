import { ICreateApplicationData } from '../models';

import { api } from '@/shared/api';

export const createApplication = async (
  content: ICreateApplicationData,
): Promise<string> => {
  const response = await api.post<string>(`/applications`, content);

  return response.data;
};
