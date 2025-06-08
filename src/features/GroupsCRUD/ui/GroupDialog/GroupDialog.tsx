import { useEffect, useState } from 'react';

import { GroupDialogProps } from './GroupDialog.types';

import { Button, Input, Label } from '@/shared/ui';
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
import { useCreateGroup, useUpdateGroup } from '@/features/GroupsCRUD/hooks';

export const GroupDialog = ({
  isGroupDialogOpen,
  setIsGroupDialogOpen,
  currentGroup,
  streams,
}: GroupDialogProps) => {
  const { mutateAsync: createGroupMutation } = useCreateGroup();
  const { mutateAsync: updateGroupMutation } = useUpdateGroup();

  const [groupNumber, setGroupNumber] = useState(0);
  const [selectedStreamId, setSelectedStreamId] = useState('');

  useEffect(() => {
    if (currentGroup) {
      setGroupNumber(currentGroup.groupNumber);
      setSelectedStreamId(currentGroup.streamId);
    }
  }, [currentGroup]);

  const handleSaveGroup = async () => {
    if (!selectedStreamId) return;

    if (currentGroup) {
      await updateGroupMutation({ id: currentGroup.id, groupNumber });
    } else {
      await createGroupMutation({ groupNumber, streamId: selectedStreamId });
    }

    setIsGroupDialogOpen(false);
  };

  return (
    <Dialog open={isGroupDialogOpen} onOpenChange={setIsGroupDialogOpen}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>
            {currentGroup ? 'Редактировать группу' : 'Добавить группу'}
          </DialogTitle>
          <DialogDescription>
            Заполните информацию о группе и нажмите сохранить.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='groupNumber' className='text-right'>
              Номер группы
            </Label>
            <Input
              id='groupNumber'
              type='number'
              value={groupNumber}
              onChange={(e) =>
                setGroupNumber(Number.parseInt(e.target.value) || 0)
              }
              className='col-span-3'
            />
          </div>
          {!currentGroup && (
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='streamId' className='text-right'>
                Поток
              </Label>
              <Select
                value={selectedStreamId}
                onValueChange={setSelectedStreamId}
              >
                <SelectTrigger className='col-span-3'>
                  <SelectValue placeholder='Выберите поток' />
                </SelectTrigger>
                <SelectContent>
                  {streams.map((stream) => (
                    <SelectItem key={stream.id} value={stream.id}>
                      Поток {stream.streamNumber} ({stream.year})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type='submit' onClick={handleSaveGroup}>
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
