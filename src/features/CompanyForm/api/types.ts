import { CompanyFormValues } from '../model';

import { ECompanyStatus } from '@/entities/Company/models';

export interface IEditCompanyParams {
  companyId: string;
  dto: Omit<CompanyFormValues, 'status'>;
}

export interface IEditCompanyStatus {
  status: ECompanyStatus;
  companyId: string;
}
