import {
  CreateStreamSemesterDto,
  StreamSemester,
} from '@/features/StreamsCRUD/model';
import { api } from '@/shared/api';
import { BASE_URL_NO_API } from '@/shared/consts/baseUrl';

export const getStreamSemesters = async (
  streamId: string,
): Promise<StreamSemester[]> => {
  const { data } = await api.get<StreamSemester[]>(
    `${BASE_URL_NO_API}/stream-semester/${streamId}`,
  );

  return data;
};

export const createStreamSemester = async (
  payload: CreateStreamSemesterDto,
): Promise<void> => {
  await api.post(`${BASE_URL_NO_API}/stream-semester`, payload);
};

export const updateStreamSemester = async (
  id: string,
  payload: CreateStreamSemesterDto,
): Promise<void> => {
  await api.put(`${BASE_URL_NO_API}/stream-semester/${id}`, payload);
};

export const deleteOrArchiveStreamSemester = async (
  id: string,
  isArchive: boolean,
): Promise<void> => {
  await api.delete(`${BASE_URL_NO_API}/stream-semester/${id}`, {
    params: { isArchive },
  });
};
