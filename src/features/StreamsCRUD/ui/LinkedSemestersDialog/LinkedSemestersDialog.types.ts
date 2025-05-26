import { SetStateAction } from 'react';

import { Stream, StreamSemesterLink } from '@/features/StreamsCRUD/model';

export interface LinkedSemestersDialogProps {
  isLinkedSemestersDialogOpen: boolean;
  setIsLinkedSemestersDialogOpen: React.Dispatch<SetStateAction<boolean>>;
  streams: Stream[];
  selectedStreamId: string | null;
  handleEditLink: (link: StreamSemesterLink) => void;
  handleAddLink: (streamId: string) => void;
}
