export interface Commentary {
  comment: string;
  diaryId: string;
  id: string;
  isDeleted: boolean;
}

export interface StudentCharacteristic {
  documentId: string;
  practice: string | null;
  practiceId: string;
  comment: Commentary[];
  id: string;
  isDeleted: boolean;
}
