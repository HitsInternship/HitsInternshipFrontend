import { AlertTriangle } from 'lucide-react';
import { DialogTitle } from '@radix-ui/react-dialog';

import { DeleteConfirmationDialogProps } from './DeleteConfirmationDialog.interfaces';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from '@/shared/ui';

export const DeleteConfirmationDialog = ({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  mainButtonName,
}: DeleteConfirmationDialogProps) => {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <div className='flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10'>
              <AlertTriangle className='h-5 w-5 text-destructive' />
            </div>
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription className='mt-1'>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className='gap-2 '>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button variant='destructive' onClick={handleConfirm}>
            {mainButtonName}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
