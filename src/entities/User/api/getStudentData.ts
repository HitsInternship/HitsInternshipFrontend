import { IStudent } from '../models';

import { api } from '@/shared/api';

export const getStudentData = async (): Promise<IStudent> => {
  const { data } = await api.get<IStudent>(`/api/student/get-student`, {});

  return data;
};
