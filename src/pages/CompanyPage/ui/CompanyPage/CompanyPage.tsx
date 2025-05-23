import { Edit2Icon, PlusIcon, ArrowLeftIcon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { CompanyPersons } from '../CompanyPersons';

import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { CompanyStatusBadge } from '@/shared/components/CompanyStatusBadge';
import { useCompany } from '@/entities/Company/hooks';

export const CompanyPage = () => {
  const { id } = useParams();
  const { data: company } = useCompany(id!);

  return (
    company && (
      <div className='container mx-auto py-8 px-4'>
        <div className='mb-6'>
          <Button variant='outline' asChild className='mb-4'>
            <Link to='/companies'>
              <ArrowLeftIcon className='mr-2 h-4 w-4' />
              Назад к списку
            </Link>
          </Button>
        </div>

        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
          <div>
            <div className='flex items-center gap-3 mb-2'>
              <h1 className='text-3xl font-bold'>{company.name}</h1>
              <CompanyStatusBadge status={company.status} />
            </div>
            <p className='text-muted-foreground'>
              {company.description || 'Нет описания'}
            </p>
          </div>
          <Button asChild variant='outline'>
            <Link to={`/companies/${company.id}/edit`}>
              <Edit2Icon className='mr-2 h-4 w-4' />
              Редактировать
            </Link>
          </Button>
        </div>

        <Tabs defaultValue='persons' className='w-full'>
          <TabsList className='mb-6'>
            <TabsTrigger value='persons'>Представители</TabsTrigger>
            <TabsTrigger value='appointments'>Встречи</TabsTrigger>
            <TabsTrigger value='agreements'>Соглашения</TabsTrigger>
          </TabsList>

          <TabsContent value='persons'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-xl font-semibold'>Представители компании</h2>
              <Button asChild>
                <Link to={`/companies/${company.id}/persons/new`}>
                  <PlusIcon className='mr-2 h-4 w-4' />
                  Добавить представителя
                </Link>
              </Button>
            </div>

            <CompanyPersons />
          </TabsContent>

          <TabsContent value='appointments'>
            <Card>
              <CardHeader>
                <CardTitle>Встречи</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  Функциональность находится в разработке
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='agreements'>
            <Card>
              <CardHeader>
                <CardTitle>Соглашения о партнерстве</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  Функциональность находится в разработке
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  );
};
