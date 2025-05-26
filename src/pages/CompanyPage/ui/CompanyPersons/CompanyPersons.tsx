import { MailIcon, PhoneIcon, MessageSquareIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { CompanyPersonsSkeleton } from '../CompanyPersonsSkeleton';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { Card } from '@/shared/ui/card';
import { getCompanyRepresentatives } from '@/entities/Company/api';

export const CompanyPersons = () => {
  const { id } = useParams();

  const { data: persons, isLoading } = useQuery({
    queryFn: () => getCompanyRepresentatives({ params: { companyId: id } }),
    queryKey: ['persons', id],
    select: (data) => data.data,
  });

  if (isLoading) {
    return <CompanyPersonsSkeleton />;
  }

  if (persons && persons.length === 0) {
    return (
      <div className='text-center py-12 border rounded-lg'>
        <h3 className='text-lg font-medium'>Нет представителей</h3>
        <p className='text-muted-foreground mt-1'>
          Добавьте первого представителя компании
        </p>
      </div>
    );
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ФИО</TableHead>
            <TableHead>Контактная информация</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {persons &&
            persons.map((person) => (
              <TableRow key={person.id}>
                <TableCell className='font-medium'>{`${person.surname || ''} ${person.name || ''}`}</TableCell>
                <TableCell>
                  <div className='space-y-1'>
                    {person.email && (
                      <div className='flex items-center gap-2'>
                        <MailIcon className='h-4 w-4 text-muted-foreground' />
                        <span>{person.email}</span>
                      </div>
                    )}
                    {person.phone && (
                      <div className='flex items-center gap-2'>
                        <PhoneIcon className='h-4 w-4 text-muted-foreground' />
                        <span>{person.phone}</span>
                      </div>
                    )}
                    {person.telegram && (
                      <div className='flex items-center gap-2'>
                        <MessageSquareIcon className='h-4 w-4 text-muted-foreground' />
                        <span>{person.telegram}</span>
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  );
};
