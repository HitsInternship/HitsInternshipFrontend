import { CommentDialogProps } from './CommentDialog.interfaces';

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Textarea,
} from '@/shared/ui';

export const CommentDialog = ({
  commentDialog,
  setCommentDialog,
}: CommentDialogProps) => {
  const saveComment = () => {
    console.log('save');
  };

  return (
    <Dialog
      open={commentDialog.isOpen}
      onOpenChange={(open) =>
        setCommentDialog((prev) => ({ ...prev, isOpen: open }))
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Комментарий к{' '}
            {commentDialog.type === 'diary' ? 'дневнику' : 'характеристике'}
          </DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <Textarea
            value={commentDialog.comment}
            onChange={(e) =>
              setCommentDialog((prev) => ({ ...prev, comment: e.target.value }))
            }
            placeholder='Введите комментарий...'
            rows={4}
          />
        </div>
        <DialogFooter>
          <Button
            variant='outline'
            onClick={() =>
              setCommentDialog((prev) => ({ ...prev, isOpen: false }))
            }
          >
            Отмена
          </Button>
          <Button onClick={saveComment}>Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
