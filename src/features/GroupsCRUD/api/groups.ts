import { CreateGroupDto, UpdateGroupDto } from '@/entities/Groups';
import { api } from '@/shared/api';

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
