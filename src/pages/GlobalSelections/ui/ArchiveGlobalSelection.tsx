import { useState } from 'react';
import { Archive } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { Button } from '@/shared/ui';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui';
import { useArchiveSelection } from '@/entities/Selection/hooks';

export interface ArchiveGlobalSelectionProps {
  id: string;
}

export const ArchiveGlobalSelection = ({ id }: ArchiveGlobalSelectionProps) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { mutate } = useArchiveSelection({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['globalSelections'],
      });
      toast.success('Отбор успешно заархивирован');
    },
    onError: () => {
      toast.error('Произошла ошибка');
    },
  });

  const archiveGlobalSelection = () => {
    mutate({ params: { selectionId: id } });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='h-10 w-10 bg-transparent'
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Archive className='h-4 w-4' />
          <span className='sr-only'>Архивировать глобальный отбор</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Archive className='h-5 w-5 text-orange-500' />
            Архивирование
          </DialogTitle>
          <DialogDescription className='text-base pt-2'>
            Вы уверены что хотите архивировать глобальный отбор?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex gap-4'>
          <Button variant='outline' onClick={handleCancel}>
            Отмена
          </Button>
          <Button
            onClick={archiveGlobalSelection}
            className='bg-orange-600 hover:bg-orange-700'
          >
            Подтвердить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
