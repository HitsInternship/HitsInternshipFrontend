import { Building, Mail, Phone } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  PageLayout,
} from '@/shared/ui';
import { CreateStudent } from '@/features/CreateStudent';
import { CreateEmployee } from '@/features/CreateEmployee';

// Пример данных
const adminData = {
  lastName: 'Петрова',
  firstName: 'Елена',
  middleName: 'Сергеевна',
  position: 'Заместитель декана по учебной работе',
  email: 'petrova.es@university.ru',
  phone: '+7 (999) 123-45-67',
  curatedCompanies: ['ООО «Технологии будущего»', 'АО «ИнноваСофт»'],
};

export const EmployeeProfilePage = () => {
  return (
    <PageLayout title='Профиль сотрудника деканата'>
      <Card>
        <CardHeader className='pb-2'>
          <CardTitle className='text-2xl'>
            {adminData.lastName} {adminData.firstName} {adminData.middleName}
          </CardTitle>
          <p className='text-muted-foreground'>{adminData.position}</p>
        </CardHeader>
        <CardContent>
          <div className='space-y-6 grid grid-cols-2'>
            <div>
              <h3 className='text-lg font-medium mb-3'>
                Контактная информация
              </h3>
              <div className='space-y-3'>
                <div className='flex items-center gap-2'>
                  <Mail className='h-4 w-4 text-muted-foreground' />
                  <span>{adminData.email}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Phone className='h-4 w-4 text-muted-foreground' />
                  <span>{adminData.phone}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className='text-lg font-medium mb-3'>Курируемые компании</h3>
              <div className='space-y-3'>
                {adminData.curatedCompanies.map((company, index) => (
                  <div key={index} className='flex items-center gap-2'>
                    <Building className='h-4 w-4 text-muted-foreground' />
                    <span>{company}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='mt-8'>
        <h2 className='text-xl font-semibold mb-4'>Быстрые действия</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2  gap-4'>
          <CreateStudent />

          <CreateEmployee />
        </div>
      </div>
    </PageLayout>
  );
};
