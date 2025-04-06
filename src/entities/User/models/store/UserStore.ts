import { action, makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

export class UserStore {
  public userName: string | undefined;

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: "UserStore",
      properties: ["userName"],
      storage: window.localStorage,
    });
  }

  public setUserName = action((userName: string): void => {
    this.userName = userName;
  });
}
