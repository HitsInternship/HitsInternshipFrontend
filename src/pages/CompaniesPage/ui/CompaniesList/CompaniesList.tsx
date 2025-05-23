import { Edit2Icon, UsersIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
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
import { getCompanies } from '@/entities/Company/api';
import { useStores } from '@/shared/contexts';
import { ROUTER_PATHS } from '@/shared/consts';
import { CompanyStatusBadge } from '@/shared/components/CompanyStatusBadge';

export const CompaniesList = observer(() => {
  const {
    companyStore: { setCompanies, companies },
  } = useStores();

  const { data, isLoading } = useQuery({
    queryFn: () => getCompanies({}),
    queryKey: ['companies'],
    select: (data) => data.data,
  });

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
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {companies.map((company) => (
        <Card key={company.id} className='flex flex-col'>
          <CardHeader>
            <div className='flex justify-between items-start'>
              <CardTitle className='text-xl'>{company.name}</CardTitle>
              <CompanyStatusBadge status={company.status} />
            </div>
            <CardDescription className='line-clamp-2 h-10'>
              {company.description || 'Нет описания'}
            </CardDescription>
          </CardHeader>
          <CardContent className='flex-grow'>
            {/* Место для доп контента (?) */}
          </CardContent>
          <CardFooter className='flex justify-between pt-4 border-t'>
            <Button variant='outline' asChild>
              <Link to={`/companies/${company.id}`}>
                <UsersIcon className='mr-2 h-4 w-4' />
                Подробнее
              </Link>
            </Button>
            <Button variant='outline' asChild>
              <Link to={ROUTER_PATHS.EDIT_COMPANY(company.id)}>
                <Edit2Icon className='mr-2 h-4 w-4' />
                Редактировать
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
});
