import { ArrowLeftIcon, Loader } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { Button } from '@/shared/ui';
import { CompanyPersonForm } from '@/features/CompanyPersonForm';
import { ROUTER_PATHS } from '@/shared/consts';
import { useCompany } from '@/entities/Company/hooks';

export const AddCompanyPersonPage = () => {
  const { id } = useParams();
  const { data: company, isLoading } = useCompany(id!);

  if (isLoading) {
    return <Loader />;
  }

  return (
    company && (
      <div className='container mx-auto py-8 px-4'>
        <Button variant='outline' asChild className='mb-6'>
          <Link to={ROUTER_PATHS.COMPANY(company.id)}>
            <ArrowLeftIcon className='mr-2 h-4 w-4' />
            Назад к компании
          </Link>
        </Button>

        <h1 className='text-3xl font-bold mb-2'>Добавить представителя</h1>
        <p className='text-muted-foreground mb-8'>Компания: {company.name}</p>
        <CompanyPersonForm companyId={company.id} />
      </div>
    )
  );
};
