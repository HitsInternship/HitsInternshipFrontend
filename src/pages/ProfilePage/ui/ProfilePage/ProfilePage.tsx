import { EmployeeProfilePage } from '../EmployeeProfilePage';
import { StudentProfilePage } from '../StudentProfilePage';

import { useStores } from '@/shared/contexts';
import { UserRole } from '@/entities/User/models';

export const ProfilePage = () => {
  const {
    userStore: { roles },
  } = useStores();

  const isStudent = roles.includes(UserRole.Student);

  return isStudent ? <StudentProfilePage /> : <EmployeeProfilePage />;
};
