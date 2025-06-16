import { CreateGroupDto, Group, UpdateGroupDto } from '@/entities/Groups';
import { api } from '@/shared/api';

export const createGroup = async (payload: CreateGroupDto): Promise<void> => {
  await api.post(`/api/groups/create`, payload);
};

export const updateGroup = async (payload: UpdateGroupDto): Promise<void> => {
  await api.put(`/api/groups/edit`, payload);
};

export const deleteGroup = async (groupId: string): Promise<void> => {
  await api.delete(`/api/groups/delete`, {
    data: { groupId },
  });
};

export const getGroupById = async (groupId: string): Promise<Group> => {
  const { data } = await api.get<Group>(`/api/groups/get/${groupId}`);
  return data;
};
