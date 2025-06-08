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

export interface CompanyRepresentative {
  id: string;
  name: string;
  surname: string;
  email: string;
  telegram: string;
  phone: string;
}
