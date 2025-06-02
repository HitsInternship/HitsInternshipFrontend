export interface ILoginData {
  phone: string;
  password: string;
}

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

export interface UserSearchOptions {
  name?: string;
  surname?: string;
  email?: string;
  roles?: UserRole[];
}
