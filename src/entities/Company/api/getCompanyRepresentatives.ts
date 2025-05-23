import { api, RequestConfig } from '@/shared/api';
import { COMPANY_ENDPOINTS } from '@/entities/Company/models';
import { CompanyRepresentative } from '@/entities/Company/models/types/types.ts';

export type GetCompanyRepresentativesConfig = RequestConfig<{
  companyId?: string;
}>;
export const getCompanyRepresentatives = ({
  params,
  config,
}: GetCompanyRepresentativesConfig) =>
  api.get<CompanyRepresentative[]>(
    COMPANY_ENDPOINTS.GET_COMPANY_REPRESENTATIVES(params.companyId!),
    config,
  );
