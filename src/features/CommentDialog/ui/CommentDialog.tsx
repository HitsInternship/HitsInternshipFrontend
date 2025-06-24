import { MessageSquare } from 'lucide-react';

import { CommentDialogProps } from './CommentDialog.interfaces';

import { Separator } from '@/shared/ui/separator';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Textarea,
} from '@/shared/ui';
import { useAddDiaryComment, useStudentDiaryById } from '@/entities/Diary';
import {
  useAddCharacteristicComment,
  useStudentCharacteristicById,
} from '@/entities/Characteristics';

export const CommentDialog = ({
  commentDialog,
  setCommentDialog,
}: CommentDialogProps) => {
  const { mutate: addCommentCharacteristic } = useAddCharacteristicComment();
  const { mutate: addCommentDiary } = useAddDiaryComment();
  const diaryId = commentDialog.type === 'diary' ? commentDialog.id : null;
  const characteristicId =
    commentDialog.type === 'characteristics' ? commentDialog.id : null;
  const { data: diary } = useStudentDiaryById(diaryId);
  const { data: characteristic } =
    useStudentCharacteristicById(characteristicId);

  const comments =
    commentDialog.type === 'diary'
      ? diary?.comment || []
      : characteristic?.comment || [];

  const saveComment = () => {
    if (commentDialog.type === 'diary') {
      addCommentDiary({
        diaryId: commentDialog.id!,
        comment: commentDialog.comment,
      });
    } else {
      addCommentCharacteristic({
        characteristicId: commentDialog.id!,
        comment: commentDialog.comment,
      });
    }

    setCommentDialog({ ...commentDialog, comment: '' });
  };

  return (
    <Dialog
      open={commentDialog.isOpen}
      onOpenChange={(open) =>
        setCommentDialog((prev) => ({ ...prev, isOpen: open }))
      }
    >
      <DialogContent className='max-w-2xl max-h-[80vh] flex flex-col'>
        <DialogHeader>
          <DialogTitle>
            Комментарии к{' '}
            {commentDialog.type === 'diary' ? 'дневнику' : 'характеристике'}
          </DialogTitle>
        </DialogHeader>

        <div className='flex-1 overflow-hidden flex flex-col gap-4'>
          <div className='flex-1 min-h-0'>
            <h4 className='text-sm font-medium mb-3 text-muted-foreground'>
              Существующие комментарии ({comments.length})
            </h4>
            <div className='space-y-3 max-h-60 overflow-y-auto pr-2'>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className='p-3 bg-muted rounded-lg'>
                    <p className='text-sm leading-relaxed'>{comment.comment}</p>
                  </div>
                ))
              ) : (
                <div className='text-center py-8 text-muted-foreground'>
                  <MessageSquare className='w-8 h-8 mx-auto mb-2 opacity-50' />
                  <p className='text-sm'>Комментариев пока нет</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className='text-sm font-medium mb-3 text-muted-foreground'>
              Добавить новый комментарий
            </h4>
            <Textarea
              value={commentDialog.comment}
              onChange={(e) =>
                setCommentDialog((prev) => ({
                  ...prev,
                  comment: e.target.value,
                }))
              }
              placeholder='Введите комментарий...'
              rows={4}
              className='resize-none'
            />
          </div>
        </div>

        <DialogFooter className='mt-4'>
          <Button
            variant='outline'
            onClick={() =>
              setCommentDialog((prev) => ({
                ...prev,
                isOpen: false,
                comment: '',
              }))
            }
          >
            Отмена
          </Button>
          <Button
            onClick={saveComment}
            disabled={!commentDialog.comment.trim()}
          >
            Сохранить комментарий
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
