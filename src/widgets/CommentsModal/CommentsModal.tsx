import { MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Card,
  CardContent,
  Textarea,
  Button,
} from '@/shared/ui';
import { useApplicationComments, useSendComment } from '@/entities/Application';

interface CommentsModalProps {
  applicationId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CommentsModal = ({
  applicationId,
  isOpen,
  onClose,
}: CommentsModalProps) => {
  const [newComment, setNewComment] = useState('');

  const { data: comments } = useApplicationComments(applicationId);
  const { mutate } = useSendComment(applicationId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    mutate({ content: newComment });
    setNewComment('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl max-h-[80vh] flex flex-col'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <MessageCircle className='h-5 w-5' />
            Комментарии к заявке
          </DialogTitle>
        </DialogHeader>

        <div className='flex-1 overflow-hidden flex flex-col'>
          {/* Comments list */}
          <div className='flex-1 overflow-y-auto space-y-4 pr-2'>
            {comments?.length === 0 ? (
              <div className='text-center text-muted-foreground py-8'>
                Комментариев пока нет
              </div>
            ) : (
              comments?.map((comment) => (
                <Card key={comment.id} className='border-l-4 border-l-blue-200'>
                  <CardContent className='p-x-4'>
                    <div className='flex items-start justify-between mb-2'>
                      <div className='flex items-center gap-2'>
                        <span className='font-medium text-sm'>
                          {comment.author.surname} {comment.author.name}
                        </span>
                      </div>
                    </div>
                    <p className='text-sm leading-relaxed'>{comment.content}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Add comment form */}
          <div className='border-t pt-4 mt-4'>
            <form onSubmit={handleSubmit} className='space-y-3'>
              <Textarea
                placeholder='Написать комментарий...'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className='min-h-[80px] resize-none'
              />
              <div className='flex justify-end'>
                <Button type='submit' size='sm' disabled={!newComment.trim()}>
                  <Send className='h-4 w-4 mr-2' />
                  Отправить
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
