import { Group } from '@/features/StreamsCRUD/model/types';
import { api } from '@/shared/api';
import { CreateGroupDto, UpdateGroupDto } from '@/features/GroupsCRUD/model';

export const getGroups = async (): Promise<Group[]> => {
  const { data } = await api.get<Group[]>(`/groups/get`, {});

  return data;
};

export const createGroup = async (payload: CreateGroupDto): Promise<void> => {
  await api.post(`/groups/create`, payload);
};

export const updateGroup = async (payload: UpdateGroupDto): Promise<void> => {
  await api.put(`/groups/edit`, payload);
};

export const deleteGroup = async (groupId: string): Promise<void> => {
  await api.delete(`/groups/delete`, {
    data: { groupId },
  });
};
