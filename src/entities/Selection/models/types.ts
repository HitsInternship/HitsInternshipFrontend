import { Semester } from '@/features/SemesterCRUD';
import { Stream } from '@/features/StreamsCRUD/model';

export enum SelectionStatus {
  InProgress = 'InProgress',
  Inactive = 'Inactive',
  OfferAccepted = 'OffersAccepted',
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

export interface ShortenCompany {
  id: string;
  isDeleted: boolean;
  name: string;
}

export enum SelectionVacancyStatus {
  Responding = 'Responding',
  Rejected = 'Rejected',
  GotOffer = 'GotOffer',
  Interview = 'Interview',
  OfferAccepted = 'OfferAccepted',
}

export interface SelectionVacancyResponse {
  id: string;
  isDeleted: boolean;
  company: ShortenCompany;
  status: SelectionVacancyStatus;
  position: string;
}

export interface Selection {
  id: string;
  isDeleted: boolean;
  selectionStatus: SelectionStatus;
  candidate: Candidate;
  offer: Offer | null;
  isConfirmed: boolean;
}

export interface SelectionExtended extends Selection {
  deadLine: string;
  responses: SelectionVacancyResponse[];
}

export interface GlobalSelection {
  id: string;
  isDeleted: boolean;
  semester: Semester;
  stream: Stream;
}

export interface GetGlobalSelectionResponse extends GlobalSelection {
  selections: SelectionExtended[];
}
