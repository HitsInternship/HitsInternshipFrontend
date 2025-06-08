export interface IPosition {
  id: string;
  isDeleted: boolean;
  name: string;
  description: string;
}

export interface CreatePositionFormData {
  name: string;
  description: string;
}
