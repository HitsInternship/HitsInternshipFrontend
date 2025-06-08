import { Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui';
import { IVacancy } from '@/entities/Vacancy';
import { ROUTER_PATHS } from '@/shared/consts';

export const VacancyCard = ({ vacancy }: { vacancy: IVacancy }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(ROUTER_PATHS.VACANCY(vacancy.id));
  };

  return (
    <Card
      className='hover:shadow-md transition-shadow'
      onClick={handleCardClick}
    >
      <CardHeader>
        <div className='flex justify-between items-start'>
          <div>
            <CardTitle className='text-lg'>{vacancy.title}</CardTitle>

            <CardDescription className='mt-1 flex items-center gap-1'>
              <Building className='h-4 w-4' />

              {vacancy.company.name}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      {vacancy.position && (
        <CardContent>
          <p className='text-m'>
            {vacancy.position.name}:{' '}
            <span className='text-sm text-muted-foreground'>
              {vacancy.position.description}
            </span>
          </p>
        </CardContent>
      )}
    </Card>
  );
};
