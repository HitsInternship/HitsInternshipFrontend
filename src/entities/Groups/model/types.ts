export type StudentStatus =
  | 'Expelled'
  | 'OnAcademicLeave'
  | 'InProcess'
  | 'Transfered'
  | 'Graduated';

export interface Student {
  id: string;
  name: string;
  surname: string;
  middlename: string;
  email: string;
  phone: string;
  isHeadMan: boolean;
  status: StudentStatus;
  groupNumber: number;
  course: number;
}

export interface Group {
  id: string;
  groupNumber: number;
  streamId: string;
  students?: Student[];
}

export interface CreateGroupDto {
  groupNumber: number;
  streamId: string;
}

export interface UpdateGroupDto {
  id: string;
  groupNumber: number;
}
