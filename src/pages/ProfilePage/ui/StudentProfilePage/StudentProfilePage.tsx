import { GraduationCap, Mail } from 'lucide-react';
import { observer } from 'mobx-react-lite';

import { InternshipStatus } from './constants';

import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  PageLayout,
} from '@/shared/ui';
import { useStudentData } from '@/entities/User/hooks';
import { getStatusColor, getStatusText } from '@/entities/Student';
import { ChangePassword } from '@/features/ChangePassword';

export const StudentProfilePage = observer(() => {
  const { data } = useStudentData();
  return (
    <PageLayout title='Профиль'>
      <Card className='mb-4'>
        <CardHeader>
          <div className='flex flex-row justify-between'>
            <CardTitle className='text-2xl'>
              {data?.name} {data?.middlename} {data?.surname}
            </CardTitle>

            {data?.status && (
              <Badge className={getStatusColor(data.status)}>
                {getStatusText(data.status)}
              </Badge>
            )}
          </div>
          <p className='text-muted-foreground'>
            Студент -{' '}
            {data?.internshipStatus && (
              <span>{InternshipStatus[data?.internshipStatus]}</span>
            )}
          </p>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {data?.isHeadMan && (
              <div className='space-y-1'>
                <p className='font-medium'>Староста</p>
              </div>
            )}

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
                  <p className='font-medium'>{data?.course} курс</p>
                </div>
                <div className='space-y-1'>
                  <p className='text-sm text-muted-foreground'>Группа</p>
                  <p className='font-medium'>{data?.groupNumber}</p>
                </div>
              </div>
            </div>

            <div className='pt-4'>
              <div className='flex items-center gap-2 mb-3'>
                <Mail className='h-4 w-4 text-muted-foreground' />
                <p className='text-sm text-muted-foreground'>
                  Контактная информация
                </p>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-1 mb-3'>
                  <p className='text-sm text-muted-foreground'>
                    Электронная почта
                  </p>
                  <p className='font-medium'>{data?.email}</p>
                </div>
                <div className='space-y-1'>
                  <p className='text-sm text-muted-foreground'>Телефон</p>
                  <p className='font-medium'>{data?.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {data?.email && <ChangePassword email={data.email} />}
    </PageLayout>
  );
});
