import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { CompaniesList } from '../CompaniesList';

import { Button } from '@/shared/ui/button';

export const CompaniesPage = () => {
  return (
    <div className='container mx-auto py-8 px-4'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
        <div>
          <h1 className='text-3xl font-bold'>Компании-партнеры</h1>
          <p className='text-muted-foreground mt-1'>
            Управление компаниями-партнерами и их представителями
          </p>
        </div>
        <Button asChild>
          <Link to='/companies/new'>
            <PlusIcon className='mr-2 h-4 w-4' />
            Добавить компанию
          </Link>
        </Button>
      </div>

      <CompaniesList />
    </div>
  );
};
