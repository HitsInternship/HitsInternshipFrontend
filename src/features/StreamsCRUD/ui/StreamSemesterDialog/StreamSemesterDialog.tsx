import { useEffect, useState } from 'react';

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
import {
  useCreateStreamSemester,
  useUpdateStreamSemester,
} from '@/features/StreamsCRUD/hooks';

export const StreamSemesterDialog = ({
  isLinkDialogOpen,
  setIsLinkDialogOpen,
  currentLinkId,
  semesters,
  linkStreamId,
  currentSemesterId,
  currentLinkNumber,
}: StreamSemesterDialogProps) => {
  const { mutateAsync: createStreamSemesterMutation } =
    useCreateStreamSemester();
  const { mutateAsync: updateStreamSemesterMutation } =
    useUpdateStreamSemester();

  const [linkSemesterId, setLinkSemesterId] = useState<string | null>('');
  const [linkNumber, setLinkNumber] = useState<number | null>(1);

  const handleSaveLink = () => {
    if (!linkSemesterId || !linkNumber) {
      return;
    }

    if (currentLinkId) {
      updateStreamSemesterMutation({
        id: currentLinkId,
        payload: {
          streamId: linkStreamId,
          semesterId: linkSemesterId,
          number: linkNumber,
        },
      });
    } else {
      createStreamSemesterMutation({
        streamId: linkStreamId,
        semesterId: linkSemesterId,
        number: linkNumber,
      });
    }

    setIsLinkDialogOpen(false);
  };

  useEffect(() => {
    setLinkSemesterId(currentSemesterId);
    setLinkNumber(currentLinkNumber);
  }, [currentSemesterId, currentLinkNumber]);

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
            <Select
              value={linkSemesterId || ''}
              onValueChange={setLinkSemesterId}
            >
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
              value={linkNumber || 1}
              min={1}
              onChange={(e) =>
                setLinkNumber(Number.parseInt(e.target.value) || 1)
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
