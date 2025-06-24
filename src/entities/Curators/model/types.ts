export interface Curator {
  id: string;
  name: string;
  surname: string;
  email: string;
  telegram: string;
  phone: string;
  companyId: string;
  companyName: string;
}

export interface UserDTO {
  name: string;
  surname: string;
  email: string;
}

export interface AddCompanyCuratorDTO {
  userRequest?: UserDTO;
  userId?: string;
  telegram: string;
  phone: string;
}

export interface AddCompanyCuratorParams {
  dto: AddCompanyCuratorDTO;
  companyId: string;
}
