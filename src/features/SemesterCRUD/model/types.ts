export interface GetSemestersParams {
  isArchive?: boolean;
}

export interface Semester {
  id: string;
  isDeleted: boolean;
  startDate: Date;
  endDate: Date;
  description: string;
}

export interface CreateSemesterDto {
  startDate: string;
  endDate: string;
  description: string;
}

export type UpdateSemesterDto = CreateSemesterDto;
