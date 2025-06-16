import { action, makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

export class SelectionStore {
  approvedSelections: string[] = [];

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'SelectionStore',
      properties: ['approvedSelections'],
      storage: window.localStorage,
    });
  }

  public addApprovedSelection = action((selectionId: string): void => {
    this.approvedSelections.push(selectionId);
  });
}
