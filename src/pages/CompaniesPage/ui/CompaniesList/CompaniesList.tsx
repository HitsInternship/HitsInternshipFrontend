import { FileDown } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';

import { CompanyListSkeleton } from '../CompaniesListSkeleton';

import {
  Card,
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
import { ECompanyStatus } from '@/entities/Company/models';
import { useCuratorInfo } from '@/entities/Curators/hooks/useCuratorInfo.ts';

export const CompaniesList = observer(() => {
  const {
    companyStore: { setCompanies, companies },
    userStore: { roles },
  } = useStores();

  const { isDeanMember, isStudent, isCurator, isAdmin } = useMemo(() => {
    const isDeanMember =
      roles.includes(UserRole.DeanMember) && roles.length === 1;
    const isStudent = roles.includes(UserRole.Student) && roles.length === 1;
    const isCurator = roles.includes(UserRole.Curator) && roles.length === 1;
    const isAdmin = !isDeanMember && !isStudent && !isCurator;
    return { isDeanMember, isStudent, isCurator, isAdmin };
  }, [roles]);

  const { data: curatorInfo, isLoading: curatorLoading } =
    useCuratorInfo(isCurator);

  const { data, isLoading } = useCompaniesList();
  const { mutate } = useDownloadInternsByCompany();

  useEffect(() => {
    if (data) {
      if (isStudent || isCurator) {
        const filteredCompanies = data.filter(
          (company) => company.status === ECompanyStatus.Partner,
        );
        setCompanies(filteredCompanies);
      } else {
        setCompanies(data);
      }
    }
  }, [data, isStudent, isCurator, setCompanies]);

  if (isLoading || curatorLoading) {
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
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))' }}
    >
      {companies.map((company) => (
        <Card key={company.id} className='flex flex-col min-w-0'>
          <CardHeader className='pb-3'>
            <div className='flex justify-between'>
              <div className='flex flex-col gap-2'>
                <div className='flex flex-row items-center gap-2'>
                  <CardTitle className='text-lg sm:text-xl max-w-50 text-wrap leading-tight truncate'>
                    {company.name}
                  </CardTitle>
                </div>
                <CompanyStatusBadge
                  status={company.status}
                  editingEnabled={isDeanMember}
                  companyId={company.id}
                  underCuratorControl={
                    company.id === curatorInfo?.companyId && isCurator
                  }
                />
                <CardDescription className='line-clamp-2 h-10 text-sm'>
                  {company.description || 'Нет описания'}
                </CardDescription>
              </div>
              <div className='flex align-left'>
                {isDeanMember && <EditCompanyDialog company={company} />}
              </div>
            </div>
          </CardHeader>
          {(isDeanMember || isAdmin) && (
            <CardFooter className='flex-col justify-between pt-4 border-t gap-2'>
              <CompanyDetailsModal company={company} />
              <Button
                variant='outline'
                className='w-full'
                onClick={() => mutate(company)}
              >
                <FileDown className='mr-2 h-4 w-4' />
                Скачать практикантов
              </Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
});
