import { UserStore } from '@/entities/User/models';
import { CompanyStore } from '@/entities/Company/models';
import { SelectionStore } from '@/entities/Selection';

declare global {
  interface IStores {
    userStore: UserStore;
    companyStore: CompanyStore;
    selectionStore: SelectionStore;
  }
}
