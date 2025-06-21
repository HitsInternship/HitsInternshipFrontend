export interface Comment {
  id: string;
  text: string;
}

export interface StudentCharacteristic {
  documentId: string;
  practice: string | null;
  practiceId: string;
  practiceComment: Comment[];
  id: string;
  isDeleted: boolean;
}
