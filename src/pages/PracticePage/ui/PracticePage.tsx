import { useState } from 'react';

import { PageLayout } from '@/shared/ui';
import { CreatePracticeDialog } from '@/features/CreatePracticeDialog';
import { PracticeFilter } from '@/features/PracticeFilter';
import { PracticeList } from '@/features/PracticeList';

export const PracticePage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <PageLayout title='Практика'>
      <div className='container mx-auto p-6 space-y-6'>
        <CreatePracticeDialog
          open={isCreateDialogOpen}
          setIsCreateDialogOpen={setIsCreateDialogOpen}
        />
        <PracticeFilter />
        <PracticeList />
      </div>
    </PageLayout>
  );
};
