import { observer } from 'mobx-react-lite';

import { EmployeeProfilePage } from '../EmployeeProfilePage';
import { StudentProfilePage } from '../StudentProfilePage';

import { useStores } from '@/shared/contexts';
import { UserRole } from '@/entities/User/models';

export const ProfilePage = observer(() => {
  const {
    userStore: { roles },
  } = useStores();

  const isStudent = roles.includes(UserRole.Student);

  console.log(isStudent);

  return isStudent ? <StudentProfilePage /> : <EmployeeProfilePage />;
});
