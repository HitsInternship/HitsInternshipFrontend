import { ArrowLeftIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ROUTER_PATHS } from '@/shared/consts';
import { Button } from '@/shared/ui';
import { CompanyForm } from '@/features/CompanyForm';

export const CreateCompanyPage = () => {
  return (
    <div className='container mx-auto py-8 px-4'>
      <Button variant='outline' asChild className='mb-6'>
        <Link to={ROUTER_PATHS.COMPANIES}>
          <ArrowLeftIcon className='mr-2 h-4 w-4' />
          Назад к списку
        </Link>
      </Button>

      <h1 className='text-3xl font-bold mb-8'>Добавить компанию</h1>
      <CompanyForm />
    </div>
  );
};
