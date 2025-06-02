import { TUserRole } from '@/entities/User/models';

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  roles: TUserRole[];
}

export interface LoginResponse {
  token: TokenResponse;
}
