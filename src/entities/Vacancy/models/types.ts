import { Company } from '@/entities/Company/models';
import { IPosition } from '@/entities/Position';

export interface IVacancy {
  id: string;
  title: string;
  position: IPosition;
  company: Omit<Company, 'status'>;
  isClosed: boolean;
}
export interface IVacancyInfo {
  id: string;
  title: string;
  description: string;
  position: IPosition;
  company: Omit<Company, 'status'>;
  isClosed: boolean;
  hasResponse: boolean;
  isDeleted: boolean;
}
export interface IVacancyList {
  vacancies: IVacancy[];
  pagination: {
    size: number;
    count: number;
    current: number;
  };
}

export interface CreateVacancyFormData {
  title: string;
  description: string;
  positionId: string;
  companyId: string;
}

export interface VacancyFilters {
  positionId?: string;
  companyId?: string;
  page: number;
  isClosed: boolean;
  isArchived: boolean;
}
