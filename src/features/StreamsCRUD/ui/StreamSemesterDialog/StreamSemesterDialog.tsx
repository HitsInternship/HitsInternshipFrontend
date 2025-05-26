import { useState } from 'react';

import { StreamSemesterDialogProps } from './StreamSemesterDialog.types';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Button, Input, Label } from '@/shared/ui';
import { useCreateStreamSemester } from '@/features/StreamsCRUD/hooks';

export const StreamSemesterDialog = ({
  isLinkDialogOpen,
  setIsLinkDialogOpen,
  currentLinkId,
  semesters,
  linkStreamId,
}: StreamSemesterDialogProps) => {
  const { mutateAsync: createStreamSemesterMutation } =
    useCreateStreamSemester();

  const [linkSemesterId, setLinkSemesterId] = useState('');
  const [linkNumber, setLinkNumber] = useState(0);

  const handleSaveLink = () => {
    if (!linkSemesterId) {
      return;
    }

    createStreamSemesterMutation({
      streamId: linkStreamId,
      semesterId: linkSemesterId,
      number: linkNumber,
    });

    setIsLinkDialogOpen(false);
  };

  return (
    <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>
            {currentLinkId
              ? 'Редактировать связь'
              : 'Добавить связь с семестром'}
          </DialogTitle>
          <DialogDescription>
            Выберите семестр и укажите его номер в потоке.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='semesterId'>Семестр</Label>
            <Select value={linkSemesterId} onValueChange={setLinkSemesterId}>
              <SelectTrigger className='col-span-3'>
                <SelectValue placeholder='Выберите семестр' />
              </SelectTrigger>
              <SelectContent>
                {semesters
                  .filter((s) => !s.isDeleted)
                  .map((semester) => (
                    <SelectItem key={semester.id} value={semester.id}>
                      {semester.description}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='number'>Номер семестра</Label>
            <Input
              id='number'
              type='number'
              value={linkNumber}
              onChange={(e) =>
                setLinkNumber(Number.parseInt(e.target.value) || 0)
              }
              className='col-span-3'
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit' onClick={handleSaveLink}>
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
