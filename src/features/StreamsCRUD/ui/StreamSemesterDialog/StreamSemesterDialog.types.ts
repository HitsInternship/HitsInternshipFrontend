import { SetStateAction } from 'react';

import { Semester } from '@/features/SemesterCRUD';

export interface StreamSemesterDialogProps {
  isLinkDialogOpen: boolean;
  setIsLinkDialogOpen: React.Dispatch<SetStateAction<boolean>>;
  currentLinkId: string | null;
  semesters: Semester[];
  linkStreamId: string;
}
