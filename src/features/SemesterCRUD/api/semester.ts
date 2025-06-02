import {
  CreateSemesterDto,
  Semester,
  UpdateSemesterDto,
} from '@/features/SemesterCRUD/model';
import { api } from '@/shared/api';

export const getSemesters = async (isArchive: boolean): Promise<Semester[]> => {
  const { data } = await api.get<Semester[]>(`/semester`, {
    params: {
      isArchive,
    },
  });

  return data;
};

export const createSemester = async (
  payload: CreateSemesterDto,
): Promise<void> => {
  await api.post(`/semester`, payload);
};

export const updateSemester = async (
  semesterId: string,
  payload: UpdateSemesterDto,
): Promise<void> => {
  await api.put(`/semester/${semesterId}`, payload);
};

export const deleteOrArchiveSemester = async (
  semesterId: string,
  isArchive: boolean,
): Promise<void> => {
  await api.delete(`/semester/${semesterId}`, {
    params: { isArchive },
  });
};
