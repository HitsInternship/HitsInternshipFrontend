import { api } from '@/shared/api';

export const createPractice = async (
  practiceType: string,
  semesterId: string,
  lastSemesterId: string,
  streamId: string,
  diaryPatternFile: File,
  characteristicsPatternFile: File,
): Promise<void> => {
  const formData = new FormData();

  formData.append('diaryPatternFile', diaryPatternFile);
  formData.append('characteristicsPatternFile', characteristicsPatternFile);

  const config = {
    params: {
      practiceType,
      semesterId,
      lastSemesterId,
      streamId,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  await api.post('/api/practice/global/add', formData, config);
};
