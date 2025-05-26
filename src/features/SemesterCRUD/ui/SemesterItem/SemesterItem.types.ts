import { Semester } from '@/features/SemesterCRUD/model';

export interface SemesterItemProps {
  semester: Semester;
  handleEditSemester: (semester: Semester) => void;
  handleArchiveSemester: (id: string) => void;
  handleDeleteSemester: (id: string) => void;
}
