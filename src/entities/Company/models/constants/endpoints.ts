import { CompanyStatus } from '@/entities/Company/models';

export const BASE_COMPANIES_URL = '/companies';

export const COMPANY_ENDPOINTS = {
  GET_COMPANIES: BASE_COMPANIES_URL,
  GET_COMPANY: (companyId: string) => `${BASE_COMPANIES_URL}/${companyId}`,
  ADD_COMPANY: `${BASE_COMPANIES_URL}/add`,
  EDIT_COMPANY: (companyId: string) => `${BASE_COMPANIES_URL}/${companyId}`,
  ADD_PARTNERSHIP_AGREEMENT: (companyId: string) =>
    `${BASE_COMPANIES_URL}/${companyId}/agreements/add`,
  CHANGE_COMPANY_STATUS: (companyId: string, status: CompanyStatus) =>
    `${BASE_COMPANIES_URL}/${companyId}/status?companyStatus=${status}`,
  ADD_COMPANY_REPRESENTATIVE: (companyId: string) =>
    `${BASE_COMPANIES_URL}/${companyId}/persons/add`,
  GET_COMPANY_REPRESENTATIVES: (companyId: string) =>
    `${BASE_COMPANIES_URL}/${companyId}/persons`,
};
