import { CreateStreamDto, Status, Stream } from '@/features/StreamsCRUD/model';
import { api } from '@/shared/api';

export const getStreams = async (): Promise<Stream[]> => {
  const { data } = await api.get<Stream[]>('/api/streams/get');

  return data;
};

export const createStream = async (payload: CreateStreamDto): Promise<void> => {
  await api.post('/api/streams/create', payload);
};

export const updateStream = async (payload: Stream): Promise<void> => {
  await api.put('/api/streams/edit', payload);
};

export const updateStreamStatus = async (
  id: string,
  status: Status,
): Promise<void> => {
  await api.put('/api/streams/edit', { id, status });
};

export const deleteStream = async (streamId: string): Promise<void> => {
  await api.delete('/api/streams/delete', { data: { streamId } });
};
