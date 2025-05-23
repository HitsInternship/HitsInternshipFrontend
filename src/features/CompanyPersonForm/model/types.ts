import { IUser } from '@/entities/User/models';

export interface ICompanyPersonFormProps {
  companyId: string;
}

export interface ICreateCompanyPersonDTO {
  userRequest: IUser;
  userId: string;
  telegram: string;
  phone: string;
  isCurator: boolean;
}

export interface ICreateCompanyPersonParams {
  companyId: string;
  dto: ICreateCompanyPersonDTO;
}
