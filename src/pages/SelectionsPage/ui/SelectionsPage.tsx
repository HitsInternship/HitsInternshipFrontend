import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import { CurrentSelections } from '@/pages/SelectionsPage';
import { UserRole } from '@/entities/User/models';
import { useStores } from '@/shared/contexts';
import { SelectionDetailsPage } from '@/pages/SelectionsPage/ui/SelectionDetailsPage.tsx';
import { CuratorSelections } from '@/pages/SelectionsPage/ui/CuratorSelections.tsx';

export const SelectionsPage = observer(() => {
  const {
    userStore: { roles },
  } = useStores();

  const { isStudent, isCurator } = useMemo(() => {
    const isDeanMember =
      roles.includes(UserRole.DeanMember) && roles.length === 1;

    const isStudent = roles.includes(UserRole.Student) && roles.length === 1;

    const isCurator = roles.includes(UserRole.Curator) && roles.length === 1;

    const isAdmin = !isDeanMember && !isStudent && !isCurator;

    return { isDeanMember, isStudent, isCurator, isAdmin };
  }, [roles]);

  if (roles.length === 0) {
    return (
      <div className='flex items-center justify-center h-[90vh] w-[100vw]'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-green-600' />
        <span className='ml-3 text-muted-foreground'>Проверка роли...</span>
      </div>
    );
  }

  if (isStudent) {
    return <SelectionDetailsPage />;
  }

  if (isCurator) {
    return <CuratorSelections />;
  }

  return <CurrentSelections />;
});
