export enum SelectionStatus {
  InProgress = 'InProgress',
  Inactive = 'Inactive',
  OfferAccepted = 'OfferAccepted',
}

export interface Candidate {
  id: string;
  isDeleted: boolean;
  name: string;
  surname: string;
  middlename: string;
  email: string;
  phone: string;
  groupNumber: number;
}

export interface Offer {
  position: string;
  companyName: string;
}

export interface Selection {
  id: string;
  isDeleted: boolean;
  selectionStatus: SelectionStatus;
  candidate: Candidate;
  offer: Offer | null;
}
