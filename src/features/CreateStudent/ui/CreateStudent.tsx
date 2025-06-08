import { UserPlus } from 'lucide-react';
import { ReactElement, useState } from 'react';

import { CreateStudentDialog } from './CreateStudentDialog';

import { Card, CardContent } from '@/shared/ui';

export const CreateStudent = (): ReactElement => {
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false);

  return (
    <>
      <Card
        className='hover:bg-muted/50 transition-colors cursor-pointer'
        onClick={() => setIsStudentDialogOpen(true)}
      >
        <CardContent className='pt-6'>
          <div className='flex flex-col items-center text-center'>
            <UserPlus className='h-8 w-8 mb-2' />
            <h3 className='font-medium'>Создать студента</h3>
            <p className='text-sm text-muted-foreground mt-1'>
              Добавить нового студента в систему
            </p>
          </div>
        </CardContent>
      </Card>
      <CreateStudentDialog
        open={isStudentDialogOpen}
        onOpenChange={setIsStudentDialogOpen}
      />
    </>
  );
};
