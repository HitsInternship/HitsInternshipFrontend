export interface Author {
  id: string;
  name: string;
  surname: string;
}

export interface ChatMessage {
  id: string;
  isDeleted: boolean;
  content: string;
  author: Author;
}
