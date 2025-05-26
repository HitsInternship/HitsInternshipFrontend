import { SetStateAction } from 'react';

import { Group, Stream } from '@/features/StreamsCRUD/model/types';

export interface GroupDialogProps {
  isGroupDialogOpen: boolean;
  setIsGroupDialogOpen: React.Dispatch<SetStateAction<boolean>>;
  currentGroup: Group | null;
  streams: Stream[];
}
