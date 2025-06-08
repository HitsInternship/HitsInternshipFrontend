import {
  CreateSemesterDto,
  Semester,
  UpdateSemesterDto,
} from '@/features/SemesterCRUD/model';
import { api } from '@/shared/api';
import { BASE_URL } from '@/shared/consts';

export const getSemesters = async (isArchive: boolean): Promise<Semester[]> => {
  const { data } = await api.get<Semester[]>(`${BASE_URL}/semester`, {
    params: {
      isArchive,
    },
  });

  return data;
};

export const createSemester = async (
  payload: CreateSemesterDto,
): Promise<void> => {
  await api.post(`${BASE_URL}/semester`, payload);
};

export const updateSemester = async (
  semesterId: string,
  payload: UpdateSemesterDto,
): Promise<void> => {
  await api.put(`${BASE_URL}/semester/${semesterId}`, payload);
};

export const deleteOrArchiveSemester = async (
  semesterId: string,
  isArchive: boolean,
): Promise<void> => {
  await api.delete(`${BASE_URL}/semester/${semesterId}`, {
    params: { isArchive },
  });
};
