import { action, makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import { TUserRole } from '../types';

export class UserStore {
  name?: string;
  role?: TUserRole = 'employee';

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'UserStore',
      properties: ['name', 'role'],
      storage: window.localStorage,
    });
  }

  public setUserName = action((userName: string): void => {
    this.name = userName;
  });
}
