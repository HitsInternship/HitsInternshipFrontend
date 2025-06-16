import { Company } from '@/entities/Company/models';
import { IPosition } from '@/entities/Position';
import { IStudent } from '@/entities/Student';

export enum EApplicationStatus {
  Created = 'Created',
  UnderConsideration = 'UnderConsideration',
  Rejected = 'Rejected',
  Accepted = 'Accepted',
}

export interface IApplication {
  id: string;
  isDeleted: boolean;
  date: string;
  status: EApplicationStatus;
  student: IStudent;
  company: Company;
  position: IPosition;
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
