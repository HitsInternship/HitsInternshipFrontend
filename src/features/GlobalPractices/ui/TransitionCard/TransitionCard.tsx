import { ArrowRight, Briefcase, Building, User } from 'lucide-react';

import { PotentialPractice } from '@/entities/Practice/models';
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@/shared/ui';

export const TransitionCard = ({
  transition,
}: {
  transition: PotentialPractice;
}) => {
  const hasTransition = transition.newCompanyId && transition.newPositionId;

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <User className='h-5 w-5' />
          {transition.studentFullName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <Badge variant='secondary' className='mb-2'>
              Текущая практика
            </Badge>
            <div className='flex items-center gap-2 text-sm'>
              <Building className='h-4 w-4 text-muted-foreground' />
              <span className='font-medium'>
                {transition.companyName || 'Без компании'}
              </span>
            </div>
            <div className='flex items-center gap-2 text-sm'>
              <Briefcase className='h-4 w-4 text-muted-foreground' />
              <span>{transition.positionName || 'Без позиции'}</span>
            </div>
          </div>

          <div className='flex items-center justify-center py-2'>
            {hasTransition ? (
              <div className='flex items-center gap-2'>
                <ArrowRight className='h-6 w-6 text-blue-500' />
                <Badge variant='default' className='bg-blue-500'>
                  Переход
                </Badge>
              </div>
            ) : (
              <div className='flex items-center gap-2'>
                <div className='h-6 w-6 rounded-full border-2 border-dashed border-gray-300' />
                <Badge variant='outline' className='text-muted-foreground'>
                  Остается
                </Badge>
              </div>
            )}
          </div>

          <div className='space-y-2'>
            {hasTransition ? (
              <>
                <Badge variant='default' className='mb-2 bg-green-500'>
                  Новая практика
                </Badge>
                <div className='flex items-center gap-2 text-sm'>
                  <Building className='h-4 w-4 text-muted-foreground' />
                  <span className='font-medium'>
                    {transition.newCompanyName || 'Без компании'}
                  </span>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                  <Briefcase className='h-4 w-4 text-muted-foreground' />
                  <span>{transition.newPositionName || 'Без позиции'}</span>
                </div>
              </>
            ) : (
              <>
                <Badge variant='outline' className='mb-2'>
                  Статус
                </Badge>
                <div className='text-sm text-muted-foreground'>
                  Студент остается на текущей практике
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
