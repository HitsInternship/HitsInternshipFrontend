import { useState } from 'react';
import { Building, CheckCircle, ThumbsUp, User, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui';
import { Selection } from '@/entities/Selection';
import { useApproveSelection } from '@/features/SelectionApproveModal/hooks';

interface SelectionApproveModalProps {
  selection: Selection;
}

export const SelectionApproveModal = ({
  selection,
}: SelectionApproveModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useApproveSelection({
    onSuccess: () => {
      toast.success('Отбор успешно одобрен');
      queryClient.invalidateQueries({ queryKey: ['selections'] });
      closeModal();
    },
    onError: () => {
      toast.error('Проиошла ошибка');
    },
  });

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onConfirmClick = () => {
    mutate({ params: { selectionId: selection.id } });
  };

  const getFullName = () => {
    const { name, surname, middlename } = selection.candidate;
    return `${surname} ${name} ${middlename}`.trim();
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
          <ThumbsUp className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <CheckCircle className='h-5 w-5 text-green-600' />
            Подтверждение оффера
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          <Card>
            <CardContent>
              <div className='space-y-3'>
                <div className='flex items-center gap-2'>
                  <User className='h-4 w-4 text-muted-foreground' />
                  <div>
                    <p className='text-sm font-medium'>Кандидат</p>
                    <p className='text-sm text-muted-foreground'>
                      {getFullName()}
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-2'>
                  <Users className='h-4 w-4 text-muted-foreground' />
                  <div>
                    <p className='text-sm font-medium'>Группа</p>
                    <p className='text-sm text-muted-foreground'>
                      № {selection.candidate.groupNumber}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {selection.offer && (
            <Card>
              <CardContent>
                <div className='space-y-3'>
                  <div className='flex items-center gap-2'>
                    <Building className='h-4 w-4 text-muted-foreground' />
                    <div>
                      <p className='text-sm font-medium'>Компания</p>
                      <p className='text-sm text-muted-foreground'>
                        {selection.offer.companyName}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <CheckCircle className='h-4 w-4 text-muted-foreground' />
                    <div>
                      <p className='text-sm font-medium'>Позиция</p>
                      <p className='text-sm text-muted-foreground'>
                        {selection.offer.position}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!selection.offer && (
            <Card>
              <CardContent className='pt-4'>
                <p className='text-sm text-muted-foreground text-center'>
                  Информация об оффере отсутствует
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter className='flex justify-end gap-2'>
          <Button variant='outline' onClick={closeModal}>
            Отмена
          </Button>
          <Button
            onClick={onConfirmClick}
            className='bg-green-600 hover:bg-green-700'
          >
            <CheckCircle className='h-4 w-4 mr-2' />
            {isPending ? 'Обработка...' : 'Подтвердить'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
