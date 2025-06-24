import { StudentPracticeDiary } from '../models';

import { api } from '@/shared/api';

export const getStudentDiaries = async (): Promise<StudentPracticeDiary[]> => {
  const { data } = await api.get<StudentPracticeDiary[]>(
    '/api/diary/student-practice-diary',
  );
  return data;
};
