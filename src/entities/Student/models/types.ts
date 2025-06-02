import { IUser } from '@/entities/User';

export enum StudentStatus {
  Expelled = 'Expelled',
  OnAcademicLeave = 'OnAcademicLeave',
  InProcess = 'InProcess',
  Transferred = 'Transfered',
  Graduated = 'Graduated',
}

export enum InternshipStatus {
  UnderSecondGrade = 'Small',
  InSearch = 'Candidate',
  GotInternship = 'Internship',
}

export interface IStudent {
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
  internshipStatus: InternshipStatus;
}

export interface EditStudentGroupDTO {
  studentId: string;
  groupId: string;
}

export interface EditStudentDTO {
  studentId: string;
  name: string;
  surnamename: string;
  middlename: string;
  email: string;
  phone: string;
  isHeadMan: boolean;
}

export interface EditStudentInternshipStatusDTO {
  id: string;
  internshipStatus: InternshipStatus;
}

export interface EditStudentStatusDTO {
  studentId: string;
  status: StudentStatus;
}

export interface CreateStudentDTO {
  password: string;
  userRequest?: IUser;
  userId?: string;
  middlename: string;
  phone: string;
  isHeadMan: boolean;
  status: StudentStatus;
  internshipStatus: InternshipStatus;
  groupId: string;
}
