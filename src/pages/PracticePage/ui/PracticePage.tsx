import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { Button, PageLayout } from '@/shared/ui';
import { CreatePracticeDialog } from '@/features/CreatePracticeDialog';
import { PracticeFilter } from '@/features/PracticeFilter';
import { PracticeList } from '@/features/PracticeList';
import { UserRole } from '@/entities/User/models';
import { useStores } from '@/shared/contexts';
import { StudentPractice } from '@/features/StudentPractice';
import { ROUTER_PATHS } from '@/shared/consts';

export const PracticePage = observer(() => {
  const {
    userStore: { roles },
  } = useStores();

  const navigate = useNavigate();

  const isDeanMember = roles.includes(UserRole.DeanMember);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <PageLayout title='Практики'>
      {isDeanMember ? (
        <div className='container mx-auto p-6 space-y-6'>
          <div className='flex gap-4'>
            <CreatePracticeDialog
              open={isCreateDialogOpen}
              setIsCreateDialogOpen={setIsCreateDialogOpen}
            />

            <Button
              variant='outline'
              className='flex items-center gap-2 mb-4'
              onClick={() => navigate(ROUTER_PATHS.CHANGE_PRACTICE)}
            >
              Заявки
            </Button>
          </div>
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
