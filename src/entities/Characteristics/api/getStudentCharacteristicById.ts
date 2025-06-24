import { StudentCharacteristic } from '../models';

import { api } from '@/shared/api';

export const getStudentCharacteristicById = async (
  id: string,
): Promise<StudentCharacteristic> => {
  const { data } = await api.get<StudentCharacteristic>(
    `/api/characteristics/student-characteristics/${id}`,
  );
  return data;
};
