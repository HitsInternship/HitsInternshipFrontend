import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';

import { CompaniesList } from '../CompaniesList';
import { CreateCompanyDialog } from '../CreateCompanyDialog';

import { PageLayout } from '@/shared/ui';
import { useStores } from '@/shared/contexts';
import { UserRole } from '@/entities/User/models';

export const CompaniesPage = observer(() => {
  const {
    userStore: { roles },
  } = useStores();

  const { isDeanMember, isAdmin } = useMemo(() => {
    const isDeanMember =
      roles.includes(UserRole.DeanMember) && roles.length === 1;
    const isStudent = roles.includes(UserRole.Student) && roles.length === 1;
    const isCurator = roles.includes(UserRole.Curator) && roles.length === 1;
    const isAdmin = !isDeanMember && !isStudent && !isCurator;
    return { isDeanMember, isStudent, isCurator, isAdmin };
  }, [roles]);

  return (
    <PageLayout
      title='Компании-партнеры'
      subTitle=' Управление компаниями-партнерами и их представителями'
    >
      <div className='container mx-auto py-8 px-4'>
        {(isDeanMember || isAdmin) && (
          <div className='flex flex-col md:flex-row justify-end md:items-center mb-8 gap-4'>
            <CreateCompanyDialog />
          </div>
        )}
        <CompaniesList />
      </div>
    </PageLayout>
  );
});
