import { observer } from 'mobx-react-lite';

import { EmployeeProfilePage } from '../EmployeeProfilePage';
import { StudentProfilePage } from '../StudentProfilePage';

import { useStores } from '@/shared/contexts';

export const ProfilePage = observer(() => {
  const {
    userStore: { roles },
  } = useStores();

  if (roles?.includes('Student')) {
    return <StudentProfilePage />;
  }

  return <EmployeeProfilePage />;
});
