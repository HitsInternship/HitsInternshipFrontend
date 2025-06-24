import { observer } from 'mobx-react-lite';

import { UserRole } from '@/entities/User/models';
import { GlobalPractices } from '@/features/GlobalPractices';
import { StudentPractice } from '@/features/StudentPractice';
import { useStores } from '@/shared/contexts';

export const GlobalPracticesPage = observer(() => {
  const {
    userStore: { roles },
  } = useStores();

  const isDeanMember = roles.includes(UserRole.DeanMember);

  return isDeanMember ? <GlobalPractices /> : <StudentPractice />;
});
