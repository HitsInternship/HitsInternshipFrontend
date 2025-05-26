import { ICreateCompanyPersonParams } from '../model';

import { api, RequestConfig } from '@/shared/api';
import { ICompanyPerson } from '@/entities/CompanyPerson/models';
import { COMPANY_ENDPOINTS } from '@/entities/Company/models';

export type AddCompanyPersonConfig = RequestConfig<ICreateCompanyPersonParams>;
export const addCompanyPerson = ({ params, config }: AddCompanyPersonConfig) =>
  api.post<ICompanyPerson>(
    COMPANY_ENDPOINTS.ADD_COMPANY_REPRESENTATIVE(params.companyId),
    params.dto,
    config,
  );
