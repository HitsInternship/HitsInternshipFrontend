import { StudentPracticeDiary } from '../models';

import { api } from '@/shared/api';

export const getStudentDiaryById = async (
  id: string,
): Promise<StudentPracticeDiary> => {
  const { data } = await api.get<StudentPracticeDiary>(
    `/api/diary/student-practice-diary/${id}`,
  );
  return data;
};
