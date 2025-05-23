import { ArrowLeftIcon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { Button } from '@/shared/ui';
import { CompanyForm } from '@/features/CompanyForm';
import { ROUTER_PATHS } from '@/shared/consts';
import { useCompany } from '@/entities/Company/hooks';

export const EditCompanyPage = () => {
  const { id } = useParams();
  const { data: company } = useCompany(id!);

  return (
    company && (
      <div className='container mx-auto py-8 px-4'>
        <Button variant='outline' asChild className='mb-6'>
          <Link to={ROUTER_PATHS.COMPANY(company.id)}>
            <ArrowLeftIcon className='mr-2 h-4 w-4' />
            Назад к компании
          </Link>
        </Button>

        <h1 className='text-3xl font-bold mb-8'>Редактировать компанию</h1>
        <CompanyForm company={company} isEdit={true} />
      </div>
    )
  );
};
