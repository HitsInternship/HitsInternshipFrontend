export interface GlobalPractice {
  id: string;
  semesterId: string;
  streamId: string;
  streamNumber: string;
  practiceType: string;
  diaryPatternDocumentId: string;
  characteristicsPatternDocumentId: string;
}

export interface GlobalPracticeData {
  semesterId: string;
  semesterStartDate: string;
  semesterEndDate: string;
  globalPractices: GlobalPractice[];
}

export interface Practice {
  id: string;
  studentId: string;
  studentFullName: string;
  mark: number | null;
  practiceDiaryId: string | null;
  characteristicsId: string | null;
}

export interface StudentPractice {
  semesterId: string;
  semesterStartDate: string;
  semesterEndDate: string;
  practiceType: string;
  diaryPatternDocumentId: string;
  characteristicsPatternDocumentId: string;
  practice: Practice;
}
