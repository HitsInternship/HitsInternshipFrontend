import { FileDown } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { CompanyListSkeleton } from '../CompaniesListSkeleton';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { useStores } from '@/shared/contexts';
import { CompanyStatusBadge } from '@/shared/components/CompanyStatusBadge';
import { UserRole } from '@/entities/User/models';
import { useCompaniesList } from '@/entities/Company';
import { useDownloadInternsByCompany } from '@/entities/Practice/hooks/useDownloadInternsByCompany';
import { CompanyDetailsModal } from '@/pages/CompaniesPage/ui/CompanyDetails/CompanyDetails.tsx';
import { EditCompanyDialog } from '@/pages/CompaniesPage/ui/EditCompanyDialog';
import { CreateCuratorModal } from '@/pages/CompaniesPage/ui/CreateCuratorDialog/CreateCuratorDialog.tsx';

export const CompaniesList = observer(() => {
  const {
    companyStore: { setCompanies, companies },
    userStore: { roles },
  } = useStores();

  const isStudent = roles.includes(UserRole.Student);
  const isDeanMember = roles.includes(UserRole.DeanMember);

  const { data, isLoading } = useCompaniesList();
  const { mutate } = useDownloadInternsByCompany();

  useEffect(() => {
    if (data !== undefined) {
      setCompanies(data);
    }
  }, [data, setCompanies]);

  if (isLoading) {
    return <CompanyListSkeleton />;
  }

  if (companies.length === 0) {
    return (
      <div className='text-center py-12'>
        <h3 className='text-lg font-medium'>Нет компаний</h3>
        <p className='text-muted-foreground mt-1'>
          Добавьте первую компанию, нажав на кнопку "Добавить компанию"
        </p>
      </div>
    );
  }

  return (
    <div
      className='grid gap-4 md:gap-6'
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
    >
      {companies.map((company) => (
        <Card key={company.id} className='flex flex-col min-w-0'>
          <CardHeader className='pb-3'>
            <div className='flex justify-between'>
              <div className='flex flex-col gap-2'>
                <div className='flex flex-col justify-between items-start gap-3'>
                  <CardTitle className='text-lg sm:text-xl max-w-54 leading-tight truncate'>
                    {company.name}
                  </CardTitle>
                </div>
                <CompanyStatusBadge status={company.status} />
                <CardDescription className='line-clamp-2 h-10 text-sm'>
                  {company.description || 'Нет описания'}
                </CardDescription>
              </div>
              <div>
                {!isStudent && <EditCompanyDialog company={company} />}
                {!isStudent && <CreateCuratorModal company={company} />}
              </div>
            </div>
          </CardHeader>
          <CardContent className='flex-grow'>
            {/* Место для доп контента (?) */}
          </CardContent>
          <CardFooter className='flex-col justify-between pt-4 border-t gap-2'>
            <CompanyDetailsModal company={company} />
            {isDeanMember && (
              <Button
                variant='outline'
                className='w-full'
                onClick={() => mutate(company)}
              >
                <FileDown className='mr-2 h-4 w-4' />
                Скачать практикантов
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
});
