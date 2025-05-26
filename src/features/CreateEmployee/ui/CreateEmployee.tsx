import { Users } from 'lucide-react';
import { ReactElement, useState } from 'react';

import { CreateEmployeeDialog } from './CreateEmployeeDialog';

import { Card, CardContent } from '@/shared/ui';

export const CreateEmployee = (): ReactElement => {
  const [isEmployeeDialogOpen, setIsEmployeeDialogOpen] = useState(false);

  return (
    <>
      <Card
        className='hover:bg-muted/50 transition-colors cursor-pointer'
        onClick={() => setIsEmployeeDialogOpen(true)}
      >
        <CardContent className='pt-6'>
          <div className='flex flex-col items-center text-center'>
            <Users className='h-8 w-8 mb-2' />
            <h3 className='font-medium'>Создать сотрудника</h3>
            <p className='text-sm text-muted-foreground mt-1'>
              Добавить нового сотрудника деканата
            </p>
          </div>
        </CardContent>
      </Card>
      <CreateEmployeeDialog
        open={isEmployeeDialogOpen}
        onOpenChange={setIsEmployeeDialogOpen}
      />
    </>
  );
};
