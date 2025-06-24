export interface CommentDialogProps {
  commentDialog: {
    isOpen: boolean;
    id: string | null;
    type: 'diary' | 'characteristics';
    comment: string;
  };
  setCommentDialog: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      id: string | null;
      type: 'diary' | 'characteristics';
      comment: string;
    }>
  >;
}
