import { api } from '@/shared/api';

export const uploadCharacteristics = async (
  idPractice: string,
  formPhoto: File,
): Promise<void> => {
  const formData = new FormData();
  formData.append('IdPractice', idPractice);
  formData.append('FormPhoto', formPhoto);

  await api.post('/api/characteristics/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
