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
  studentFullName: string | null;
  mark: number | null;
  practiceDiaryId: string | null;
  characteristicsId: string | null;
}

export interface StudentPractice {
  semesterId: string;
  semesterStartDate: string;
  semesterEndDate: string;
  practiceType: number;
  diaryPatternDocumentId: string;
  characteristicsPatternDocumentId: string;
  practice: Practice;
}

export interface PotentialPractice {
  studentId: string;
  studentFullName: string;
  companyId: string | null;
  companyName: string | null;
  positionId: string | null;
  positionName: string | null;
  newCompanyId: string | null;
  newCompanyName: string | null;
  newPositionId: string | null;
  newPositionName: string | null;
}

export interface Statistics {
  [key: string]: {
    [key: string]: number;
  };
}
