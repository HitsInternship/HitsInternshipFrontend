import { IUser } from '@/entities/User';

export enum EStudentStatus {
  Expelled = 'Expelled',
  OnAcademicLeave = 'OnAcademicLeave',
  InProcess = 'InProcess',
  Transferred = 'Transfered',
  Graduated = 'Graduated',
}

export enum EInternshipStatus {
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
  status: EStudentStatus;
  groupNumber: number;
  course: number;
  internshipStatus: EInternshipStatus;
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
  internshipStatus: EInternshipStatus;
}

export interface EditStudentStatusDTO {
  studentId: string;
  status: EStudentStatus;
}

export interface CreateStudentDTO {
  password: string;
  userRequest?: IUser;
  userId?: string;
  middlename: string;
  phone: string;
  isHeadMan: boolean;
  status: EStudentStatus;
  internshipStatus: EInternshipStatus;
  groupId: string;
}
