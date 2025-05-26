import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { Card } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';

export const CompanyPersonsSkeleton = () => {
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
          {Array.from({ length: 3 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className='h-5 w-40' />
              </TableCell>
              <TableCell>
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-48' />
                  <Skeleton className='h-4 w-32' />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
