import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Loader2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { Author } from '../model';
import { useAddComment, useGetComments } from '../hooks';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from '@/shared/ui';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { ScrollArea } from '@/shared/ui/scroll-area';

interface SelectionChatModalProps {
  selectionId: string;
}

export const SelectionChatModal = ({
  selectionId,
}: SelectionChatModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const { data: messages, isLoading } = useGetComments(
    selectionId,
    isModalOpen,
  );

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['selections', selectionId] });
    setNewMessage('');
  };

  const onError = () => {
    toast.error('Произошла ошибка при отправке сообщения!');
  };

  const { mutate: send, isPending: isSending } = useAddComment({
    onSuccess,
    onError,
  });

  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const closeModal = () => {
    setIsModalOpen(false);
    setNewMessage('');
  };

  const getInitials = (author: Author) => {
    return `${author.name.charAt(0)}${author.surname.charAt(0)}`.toUpperCase();
  };

  const onSendButtonClick = () => {
    send({ params: { selectionId: selectionId, comment: newMessage } });
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeModal();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <MessageSquare className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl h-[600px] flex flex-col'>
        <DialogHeader>
          <DialogTitle>Чат</DialogTitle>
        </DialogHeader>

        <div className='flex-1 flex flex-col min-h-0'>
          <ScrollArea className='flex-1 pr-4 h-[200px]'>
            {isLoading ? (
              <div className='flex items-center justify-center h-32'>
                <Loader2 className='h-6 w-6 animate-spin' />
                <span className='ml-2'>Загрузка сообщений...</span>
              </div>
            ) : messages?.length === 0 ? (
              <div className='flex items-center justify-center h-32 text-muted-foreground'>
                Нет сообщений
              </div>
            ) : (
              <div className='space-y-4 p-4'>
                {messages?.map((message) => (
                  <div key={message.id} className='flex items-start space-x-3'>
                    <Avatar className='h-8 w-8'>
                      <AvatarFallback className='text-xs'>
                        {getInitials(message.author)}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex-1 space-y-1'>
                      <div className='flex items-center space-x-2'>
                        <span className='text-sm font-medium'>
                          {message.author.name} {message.author.surname}
                        </span>
                      </div>
                      <div className='bg-muted p-3 rounded-lg'>
                        <p className='text-sm whitespace-pre-wrap'>
                          {message.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          <div className='border-t pt-4 mt-4'>
            <div className='flex space-x-2'>
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder='Введите сообщение...'
                disabled={isSending}
                className='flex-1'
              />
              <Button
                onClick={onSendButtonClick}
                disabled={!newMessage.trim() || isSending}
                size='icon'
              >
                {isSending ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  <Send className='h-4 w-4' />
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
