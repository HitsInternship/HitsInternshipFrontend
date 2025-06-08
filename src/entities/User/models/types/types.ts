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
  name: string;
  surname: string;
  email: string;
}
export interface IDeanMember extends IUser {
  id: string;
  isDeleted: boolean;
}
export interface ICurator extends IUser {
  id: string;
  telegram: string;
  phone: string;
}
export interface IStudent extends IUser {
  id: string;
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
