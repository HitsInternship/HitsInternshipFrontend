export type StudentStatus =
  | 'Expelled'
  | 'OnAcademicLeave'
  | 'InProcess'
  | 'Transfered'
  | 'Graduated';

export interface IStudent {
  id: string;
  name: string | null;
  surname: string | null;
  middlename: string | null;
  email: string | null;
  phone: string | null;
  isHeadMan: boolean;
  status: StudentStatus;
  groupNumber: number | null;
  course: number | null;
}
