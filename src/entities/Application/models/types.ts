import { Company } from '@/entities/Company/models';
import { IPosition } from '@/entities/Position';
import { IStudent } from '@/entities/Student';

export enum EApplicationStatus {
  Created = 'Created',
  UnderConsideration = 'UnderConsideration',
  Rejected = 'Rejected',
  Accepted = 'Accepted',
}

export interface ICreateApplicationData {
  description: string;
  companyId: string;
  positionId: string;
  date: string;
}
export interface ICreateApplicationForm extends ICreateApplicationData {
  document: File | null;
}

export interface IApplication {
  id: string;
  isDeleted: boolean;
  date: string;
  status: EApplicationStatus;
  student: IStudent;
  newCompany: Company;
  newPosition: IPosition;
  oldCompany: Company;
  oldPosition: IPosition;
  commentsCount: number;
}

export interface IApplicationFilters {
  page: number;
  name?: string;
  isArchived: boolean;
  status?: EApplicationStatus;
}

export interface IApplicationDetails
  extends Omit<IApplication, 'id' | 'isDeleted'> {
  description: string;
  documentUrl: string;
}

export interface ApplicationListResponse {
  applications: IApplication[];
  pagination: {
    size: number;
    count: number;
    current: number;
  };
}

export interface IComment {
  id: string;
  isDeleted: boolean;
  content: string;
  author: {
    id: string;
    name: string;
    surname: string;
  };
}
