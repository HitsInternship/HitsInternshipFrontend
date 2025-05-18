import { UserStore } from '@entities/User/models';

declare global {
  interface IStores {
    userStore: UserStore;
  }
}
