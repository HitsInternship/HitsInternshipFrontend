import { UserStore } from '@/entities/User/models';
import { CompanyStore } from '@/entities/Company/models';

declare global {
  interface IStores {
    userStore: UserStore;
    companyStore: CompanyStore;
  }
}
