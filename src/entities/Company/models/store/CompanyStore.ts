import { makeAutoObservable } from 'mobx';

import { Company } from '../types';

export class CompanyStore {
  companies: Company[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCompanies = (companies: Company[]) => {
    this.companies = companies;
  };

  clearCompanies = () => {
    this.companies = [];
  };
}
