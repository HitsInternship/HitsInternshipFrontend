import { GraduationCap, Mail } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  PageLayout,
} from '@/shared/ui';

export const ProfilePage = () => {
  return (
    <PageLayout title='Профиль'>
      <Card>
        <CardHeader className='pb-2'>
          <CardTitle className='text-2xl'>Иванов Сергей Петрович</CardTitle>
          <p className='text-muted-foreground'>Студент</p>
        </CardHeader>
        <CardContent>
          <div className='space-y-4 mt-2'>
            <div className='grid grid-cols-1 gap-4'>
              <div className='space-y-1'>
                <p className='text-sm text-muted-foreground'>Фамилия</p>
                <p className='font-medium'>Иванов</p>
              </div>
              <div className='space-y-1'>
                <p className='text-sm text-muted-foreground'>Имя</p>
                <p className='font-medium'>Сергей</p>
              </div>
              <div className='space-y-1'>
                <p className='text-sm text-muted-foreground'>Отчество</p>
                <p className='font-medium'>Петрович</p>
              </div>
            </div>

            <div className='pt-2'>
              <div className='flex items-center gap-2 mb-3'>
                <GraduationCap className='h-4 w-4 text-muted-foreground' />
                <p className='text-sm text-muted-foreground'>
                  Информация об обучении
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-1'>
                  <p className='text-sm text-muted-foreground'>Курс</p>
                  <p className='font-medium'>3 курс</p>
                </div>
                <div className='space-y-1'>
                  <p className='text-sm text-muted-foreground'>Группа</p>
                  <p className='font-medium'>ИС-301</p>
                </div>
              </div>
            </div>

            <div className='pt-2'>
              <div className='flex items-center gap-2 mb-3'>
                <Mail className='h-4 w-4 text-muted-foreground' />
                <p className='text-sm text-muted-foreground'>
                  Контактная информация
                </p>
              </div>

              <div className='space-y-1'>
                <p className='text-sm text-muted-foreground'>
                  Электронная почта
                </p>
                <p className='font-medium'>ivanov.sp@university.ru</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};
