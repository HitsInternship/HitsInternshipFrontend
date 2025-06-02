import { action, makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import { TUserRole } from '../types';

export class UserStore {
  name?: string;
  roles: TUserRole[] = [];
  isAuthorized: boolean = false;
  isHydrated: boolean = false;

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'UserStore',
      properties: ['name', 'roles', 'isAuthorized'],
      storage: window.localStorage,
    });
  }

  public setUserName = action((userName: string): void => {
    this.name = userName;
  });

  public setIsAuthorized = action((isAuthorized: boolean): void => {
    this.isAuthorized = isAuthorized;
  });

  public setRoles = action((roles: TUserRole[]): void => {
    this.roles = roles;
  });

  public dataInstallation = action((isAuthorized: boolean): void => {
    this.isAuthorized = isAuthorized;
  });
}
