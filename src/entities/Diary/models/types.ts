export interface Comment {
  comment: string;
  diaryId: string;
  id: string;
  isDeleted: boolean;
}

export interface StudentPracticeDiary {
  documentId: string;
  practice: string | null;
  practiceId: string;
  comment: Comment[];
  id: string;
  isDeleted: boolean;
}
