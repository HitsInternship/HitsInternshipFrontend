export interface ILoginData {
  phone: string;
  password: string;
}
export interface ILoginData {
  phone: string;
  password: string;
}

export type TUserRole = 'Student' | 'DeanMember' | 'Curator';

export type TStudentStatus =
  | 'Expelled'
  | 'OnAcademicLeave'
  | 'InProcess'
  | 'Transfered'
  | 'Graduated';

export type TInternshipStatus = 'Small' | 'Candidate' | 'Intern';

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
