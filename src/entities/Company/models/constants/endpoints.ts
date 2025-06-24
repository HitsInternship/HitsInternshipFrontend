import { ECompanyStatus } from '@/entities/Company/models';

export const BASE_COMPANIES_URL = '/api/companies';

export const COMPANY_ENDPOINTS = {
  GET_COMPANIES: BASE_COMPANIES_URL,
  GET_COMPANY: (companyId: string) => `${BASE_COMPANIES_URL}/${companyId}`,
  ADD_COMPANY: `${BASE_COMPANIES_URL}/add`,
  EDIT_COMPANY: (companyId: string) => `${BASE_COMPANIES_URL}/${companyId}`,
  CHANGE_COMPANY_STATUS: (companyId: string, status: ECompanyStatus) =>
    `${BASE_COMPANIES_URL}/${companyId}/status?companyStatus=${status}`,
};
