import { action, makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import { TUserRole } from '../types';

export class UserStore {
  name?: string;
  role?: TUserRole = 'employee';
  isAuthorized: boolean = false;

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'UserStore',
      properties: ['name', 'role', 'isAuthorized'],
      storage: window.localStorage,
    });
  }

  public setUserName = action((userName: string): void => {
    this.name = userName;
  });

  public setIsAuthorized = action((isAuthorized: boolean): void => {
    this.isAuthorized = isAuthorized;
  });
}
