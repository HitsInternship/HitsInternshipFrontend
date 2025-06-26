import { Mail, Phone } from 'lucide-react';
import { observer } from 'mobx-react-lite';

import { IProfileData } from './EmployeeProfilePage.interfaces';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  PageLayout,
} from '@/shared/ui';
// import { CreateStudent } from '@/features/CreateStudent';
// import { CreateEmployee } from '@/features/CreateEmployee';
import { useCuratorData, useDeanMemberData } from '@/entities/User/hooks';
import { useStores } from '@/shared/contexts';
import { UserRole } from '@/entities/User/models';
import { CreateEmployee } from '@/features/CreateEmployee';
import { ChangePassword } from '@/features/ChangePassword';

export const EmployeeProfilePage = observer(() => {
  const {
    userStore: { roles },
  } = useStores();

  const { data: deanMemberData } = useDeanMemberData();
  const { data: curatorData } = useCuratorData();

  const isDeanMember = roles.includes(UserRole.DeanMember);

  if (!deanMemberData && !curatorData) {
    return null;
  }
  const profileData: IProfileData = {
    name: deanMemberData?.name || curatorData?.name,
    surname: deanMemberData?.surname || curatorData?.surname,
    email: deanMemberData?.email || curatorData?.email,
    telegram: curatorData?.telegram,
    phone: curatorData?.phone,
  };
  return (
    <PageLayout title='Профиль'>
      <Card className='mb-4'>
        <CardHeader className='pb-2'>
          <CardTitle className='text-2xl'>
            {profileData.name} {profileData.surname}
          </CardTitle>
          {roles.includes(UserRole.DeanMember) && (
            <p className='text-muted-foreground'>Сотрудник деканата</p>
          )}
          {roles.includes(UserRole.Curator) && (
            <p className='text-muted-foreground'>Куратор</p>
          )}
        </CardHeader>
        <CardContent>
          <div className='space-y-6 grid grid-cols-2'>
            <div>
              <h3 className='text-lg font-medium mb-3'>
                Контактная информация
              </h3>
              <div className='space-y-3'>
                <div className='flex items-center gap-2'>
                  <Mail className='h-4 w-4 text-muted-foreground' />
                  <span>{profileData.email}</span>
                </div>
                {profileData.telegram && (
                  <div className='flex items-center gap-2'>
                    <Phone className='h-4 w-4 text-muted-foreground' />
                    <span>{profileData.telegram}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {profileData.email && <ChangePassword email={profileData.email} />}

      {isDeanMember && (
        <div className='mt-8'>
          <h2 className='text-xl font-semibold mb-4'>Быстрые действия</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2  gap-4'>
            <CreateEmployee />
          </div>
        </div>
      )}
    </PageLayout>
  );
});
