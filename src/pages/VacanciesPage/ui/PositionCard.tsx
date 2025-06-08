import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { IPosition, useDeletePosition } from '@/entities/Position';
import { UserRole } from '@/entities/User/models';
import { useStores } from '@/shared/contexts';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/ui';
import { EditPositionDialog } from '@/features/EditPositionDialog';
import { DeleteConfirmationDialog } from '@/widgets/DeleteConfirmationDialog';

export const PositionCard = ({ position }: { position: IPosition }) => {
  const { mutate } = useDeletePosition();
  const {
    userStore: { roles },
  } = useStores();

  const [isEditPositionDialogOpen, setIsEditPositionDialogOpen] =
    useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const canControl =
    roles.includes(UserRole.Curator) || roles.includes(UserRole.DeanMember);

  const handleEditPosition = () => {
    setIsEditPositionDialogOpen(true);
  };

  const handleDeletePosition = () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmDeletePosition = () => {
    setIsDeleteDialogOpen(false);

    mutate(position.id);
  };

  return (
    <>
      <Card className='hover:shadow-md transition-shadow'>
        <CardHeader>
          <div className='flex justify-between items-start'>
            <CardTitle className='text-lg'>{position.name}</CardTitle>
            {canControl && (
              <div className='flex gap-1 ml-2'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={handleEditPosition}
                  className='h-8 w-6 p-0'
                >
                  <Edit className='h-4 w-4' />
                  <span className='sr-only'>Редактировать</span>
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={handleDeletePosition}
                  className='h-8 w-6 p-0 text-destructive hover:text-destructive'
                >
                  <Trash2 className='h-4 w-4' />
                  <span className='sr-only'>Удалить</span>
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground'>
            {position.description}
          </p>
        </CardContent>
      </Card>

      <EditPositionDialog
        open={isEditPositionDialogOpen}
        onOpenChange={setIsEditPositionDialogOpen}
        position={position}
      />

      <DeleteConfirmationDialog
        mainButtonName='Удалить'
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDeletePosition}
        title='Удалить позицию'
        description={`Вы уверены, что хотите удалить позицию "${position.name}"? Это действие нельзя отменить.`}
      />
    </>
  );
};
