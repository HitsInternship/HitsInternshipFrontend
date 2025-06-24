import { StudentCharacteristic } from '../models';

import { api } from '@/shared/api';

export const getStudentCharacteristics = async (): Promise<
  StudentCharacteristic[]
> => {
  const { data } = await api.get<StudentCharacteristic[]>(
    '/api/characteristics/student-characteristics',
  );
  return data;
};
