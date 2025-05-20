import { Building, Calendar, Star } from 'lucide-react';

import { StatusBadge } from '../StatusBadge';
import { RatingStars } from '../RatingStars';

import { IInternship } from '@/entities/Internship';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/shared/ui';

export const InternshipCard = ({ internship }: { internship: IInternship }) => {
  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between items-start'>
          <div>
            <CardTitle>{internship.position}</CardTitle>
            <CardDescription className='mt-1'>
              {internship.company}
            </CardDescription>
          </div>
          <StatusBadge status={internship.status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='flex items-center gap-2'>
            <Building className='h-4 w-4 text-muted-foreground' />
            <span>{internship.company}</span>
          </div>

          <div className='flex items-center gap-2'>
            <Calendar className='h-4 w-4 text-muted-foreground' />
            <span>{internship.period}</span>
          </div>

          {internship.rating !== undefined && (
            <div className='flex items-center gap-2'>
              <Star className='h-4 w-4 text-amber-500' />
              <div className='flex items-center'>
                <span className='font-medium mr-2'>
                  Оценка: {internship.rating}
                </span>
                <RatingStars rating={internship.rating} />
              </div>
            </div>
          )}

          <div className='text-sm text-muted-foreground mt-2'>
            Семестр: {internship.semester}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
