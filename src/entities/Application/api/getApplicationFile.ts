import { api } from '@/shared/api';

export const getApplicationFile = async (id: string): Promise<string> => {
  const response = await api.get(`/applications/${id}/file`, {
    responseType: 'blob',
  });

  const blob = new Blob([response.data], {
    type: response.headers['content-type'],
  });

  return URL.createObjectURL(blob); // создаём временную ссылку на файл
};
