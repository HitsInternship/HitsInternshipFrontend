import { StudentPractice } from '../models';

import { api } from '@/shared/api';

export const getStudentPractice = async (): Promise<StudentPractice[]> => {
  const { data } = await api.get<StudentPractice[]>(
    '/api/practice/global/student',
  );
  return data;
};
