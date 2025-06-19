import { observer } from 'mobx-react-lite';

import { CompaniesList } from '../CompaniesList';
import { CreateCompanyDialog } from '../CreateCompanyDialog';

import { PageLayout } from '@/shared/ui';
import { useStores } from '@/shared/contexts';
import { UserRole } from '@/entities/User/models';

export const CompaniesPage = observer(() => {
  const {
    userStore: { roles },
  } = useStores();

  const isStudent = roles.includes(UserRole.Student);

  return (
    <PageLayout
      title='Компании-партнеры'
      subTitle=' Управление компаниями-партнерами и их представителями'
    >
      <div className='container mx-auto py-8 px-4'>
        {!isStudent && (
          <div className='flex flex-col md:flex-row justify-end md:items-center mb-8 gap-4'>
            <CreateCompanyDialog />
          </div>
        )}
        <CompaniesList />
      </div>
    </PageLayout>
  );
});
