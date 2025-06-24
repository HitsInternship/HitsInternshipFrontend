import { api } from '@/shared/api';

export const uploadPracticeDiary = async (
  idPractice: string,
  formPhoto: File,
): Promise<void> => {
  const formData = new FormData();
  formData.append('IdPractice', idPractice);
  formData.append('FormPhoto', formPhoto);

  await api.post('/api/diary/student-practice-diary', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
