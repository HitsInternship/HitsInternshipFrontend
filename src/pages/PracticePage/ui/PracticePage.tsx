import { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { PageLayout } from '@/shared/ui';
import { CreatePracticeDialog } from '@/features/CreatePracticeDialog';
import { PracticeFilter } from '@/features/PracticeFilter';
import { PracticeList } from '@/features/PracticeList';
import { UserRole } from '@/entities/User/models';
import { useStores } from '@/shared/contexts';
import { StudentPractice } from '@/features/StudentPractice';

export const PracticePage = observer(() => {
  const {
    userStore: { roles },
  } = useStores();

  const isDeanMember = roles.includes(UserRole.DeanMember);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <PageLayout title='Практика'>
      {isDeanMember ? (
        <div className='container mx-auto p-6 space-y-6'>
          <CreatePracticeDialog
            open={isCreateDialogOpen}
            setIsCreateDialogOpen={setIsCreateDialogOpen}
          />
          <PracticeFilter />
          <PracticeList />
        </div>
      ) : (
        <div className='container mx-auto p-6 max-w-4xl'>
          <StudentPractice />
        </div>
      )}
    </PageLayout>
  );
});
