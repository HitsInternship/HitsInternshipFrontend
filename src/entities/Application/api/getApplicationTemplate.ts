import { api } from '@/shared/api';

export const getApplicationTemplate = async (): Promise<string> => {
  const response = await api.get(`/applications/template`, {
    responseType: 'blob',
  });

  const blob = new Blob([response.data], {
    type: response.headers['content-type'],
  });

  return URL.createObjectURL(blob); // создаём временную ссылку на файл
};
