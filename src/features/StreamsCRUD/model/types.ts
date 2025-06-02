import { Semester } from '@/features/SemesterCRUD';

export type Status = 'Selection' | 'Practice' | 'None';

export interface Stream {
  id: string;
  streamNumber: number;
  year: number;
  course: number;
  status: Status;
}

export interface StreamSemesterLink {
  id: string;
  streamId: string;
  semesterId: string;
  number: number;
  isDeleted: boolean;
  semester: Semester;
}

export interface CreateStreamDto {
  streamNumber: number;
  year: number;
  status: Status;
  course: number;
}

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
  students: Student[] | null;
}

export interface StreamSemester {
  id: string;
  isDeleted: boolean;
  stream: (Stream & { groups?: Group[] }) | null;
  semester: Semester;
  number: number;
}

export interface CreateStreamSemesterDto {
  streamId: string;
  semesterId: string;
  number: number;
}
