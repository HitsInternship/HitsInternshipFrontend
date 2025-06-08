import { IUser, UserSearchOptions } from '../models';

import { api, RequestConfig } from '@/shared/api';

export type SearchForUsersConfig = RequestConfig<UserSearchOptions>;
export const searchForUsers = ({ params, config }: SearchForUsersConfig) => {
  const searchParams = new URLSearchParams();

  if (params.name) {
    searchParams.append('name', params.name);
  }

  if (params.surname) {
    searchParams.append('surname', params.surname);
  }

  if (params.email) {
    searchParams.append('email', params.email);
  }

  if (params.roles) {
    searchParams.forEach((role) => {
      searchParams.append('roles', role);
    });
  }

  console.log(searchParams);

  return api.get<IUser[]>(`/api/users/search?${searchParams}`, config);
};
