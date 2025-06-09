export interface CommentDialogProps {
  commentDialog: {
    isOpen: boolean;
    studentId: string;
    type: 'diary' | 'characteristic';
    comment: string;
  };
  setCommentDialog: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      studentId: string;
      type: 'diary' | 'characteristic';
      comment: string;
    }>
  >;
}
