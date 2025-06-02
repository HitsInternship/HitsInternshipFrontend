import { UserRole } from '@/entities/User/models';

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  roles: UserRole[];
}

export interface LoginResponse {
  token: TokenResponse;
}
