import { Group, Student } from '@/entities/Groups';
import { Stream } from '@/features/StreamsCRUD/model';

export interface GroupItemProps {
  group: Group;
  headMan: Student | undefined;
  streamInfo: Stream | undefined;
  isExpanded: boolean;
  toggleGroupExpansion: (groupId: string) => void;
  handleEditGroup: (group: Group) => void;
}
