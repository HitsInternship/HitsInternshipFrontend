import { MessageSquare } from 'lucide-react';

import { Commentary } from '@/entities/Characteristics';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui';

export const CommentsDialog = ({
  title,
  comments,
}: {
  title: string;
  comments: Commentary[];
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm' variant='outline' className='w-full'>
          <MessageSquare className='w-4 h-4 mr-2' />
          Комментарии ({comments.length})
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className='space-y-4 max-h-96 overflow-y-auto'>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className='p-3 bg-muted rounded-lg'>
                <p className='text-sm'>{comment.comment}</p>
              </div>
            ))
          ) : (
            <div className='text-center py-8 text-muted-foreground'>
              <MessageSquare className='w-8 h-8 mx-auto mb-2 opacity-50' />
              <p className='text-sm'>Комментариев пока нет</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
