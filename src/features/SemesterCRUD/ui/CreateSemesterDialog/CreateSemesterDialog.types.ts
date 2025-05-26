import { Semester } from '@/features/SemesterCRUD/model';

export interface CreateSemesterDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentSemester: Semester | null;
}
