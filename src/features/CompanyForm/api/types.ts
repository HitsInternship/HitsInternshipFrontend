import { CompanyFormValues } from '../model';

import { CompanyStatus } from '@/entities/Company/models';

export interface IEditCompanyParams {
  companyId: string;
  dto: Omit<CompanyFormValues, 'status'>;
}

export interface IEditCompanyStatus {
  status: CompanyStatus;
  companyId: string;
}
