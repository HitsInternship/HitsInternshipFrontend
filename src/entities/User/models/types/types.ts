export interface ILoginData {
  phone: string;
  password: string;
}
export interface ILoginData {
  phone: string;
  password: string;
}

export type TStudentStatus =
  | 'Expelled'
  | 'OnAcademicLeave'
  | 'InProcess'
  | 'Transfered'
  | 'Graduated';

export type TInternshipStatus = 'Small' | 'Candidate' | 'Intern';

export enum UserRole {
  Student = 'Student',
  Curator = 'Curator',
  DeanMember = 'DeanMember',
}

export interface IUser {
  name: string;
  surname: string;
  email: string;
}
export interface IStudent {
  id: string;
  name: string;
  surname: string;
  email: string;
  middlename: string;
  phone: string;
  isHeadMan: string;
  status: TStudentStatus;
  internshipStatus: TInternshipStatus;
  groupNumber: number;
  course: number;
}
export interface UserSearchOptions {
  name?: string;
  surname?: string;
  email?: string;
  roles?: UserRole[];
}
