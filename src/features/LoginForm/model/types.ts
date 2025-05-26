export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  token: TokenResponse;
}
