import { SetStateAction } from 'react';

import { Stream } from '@/features/StreamsCRUD/model/types';
import { Group } from '@/entities/Groups';

export interface GroupDialogProps {
  isGroupDialogOpen: boolean;
  setIsGroupDialogOpen: React.Dispatch<SetStateAction<boolean>>;
  currentGroup: Group | null;
  streams: Stream[];
}
