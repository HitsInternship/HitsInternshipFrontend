import { action, makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import { UserRole } from '../../models';

export class UserStore {
  name?: string;

  roles: UserRole[] = [];
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

  public setUserRole = action((role: UserRole[]): void => {
    this.roles = role;
  });
}
