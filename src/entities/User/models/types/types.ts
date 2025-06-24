import { EStudentStatus } from '@/entities/Student';

export interface ILoginData {
  phone: string;
  password: string;
}
export interface ILoginData {
  phone: string;
  password: string;
}

export type TUserInternshipStatus = 'Small' | 'Candidate' | 'Intern';

export enum UserRole {
  Student = 'Student',
  Curator = 'Curator',
  DeanMember = 'DeanMember',
}

export interface IUser {
  id: string;
  name: string;
  surname: string;
  email: string;
}
export interface IDeanMember extends IUser {
  isDeleted: boolean;
}
export interface ICurator extends IUser {
  telegram: string;
  phone: string;
}
export interface IStudent extends IUser {
  middlename: string;
  phone: string;
  isHeadMan: string;
  status: EStudentStatus;
  internshipStatus: TUserInternshipStatus;
  groupNumber: number;
  course: number;
}
export interface UserSearchOptions {
  name?: string;
  surname?: string;
  email?: string;
  roles?: UserRole[];
}
