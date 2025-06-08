import { IDeanMember } from '../models';

import { api } from '@/shared/api';

export const getDeanMemberData = async (): Promise<IDeanMember> => {
  const { data } = await api.get<IDeanMember>(`/api/dean_member`, {});

  return data;
};
