export interface Comment {
  id: string;
  text: string;
}

export interface StudentPracticeDiary {
  documentId: string;
  practice: string | null;
  practiceId: string;
  practiceComment: Comment[];
  id: string;
  isDeleted: boolean;
}
