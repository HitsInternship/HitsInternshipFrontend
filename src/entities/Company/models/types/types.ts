export enum ECompanyStatus {
  Partner = 'Partner',
  FormerPartner = 'FormerPartner',
  PotentialPartner = 'PotentialPartner',
}

export interface Company {
  id: string;
  name: string;
  description: string;
  status: ECompanyStatus;
}

export interface CreateCompanyDTO {
  name: string;
  description: string;
  status: ECompanyStatus;
}

export interface UpdateCompanyDTO {
  name: string;
  description: string;
}

export interface ChangeCompanyStatusParams {
  companyId: string;
  status: ECompanyStatus;
}
