import { EmployeeProfilePage } from '../EmployeeProfilePage';
import { StudentProfilePage } from '../StudentProfilePage';

import { useStores } from '@/shared/contexts';

export const ProfilePage = () => {
  const {
    userStore: { role },
  } = useStores();
  console.log(role);
  return role === 'student' ? <StudentProfilePage /> : <EmployeeProfilePage />;
};
