import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';

export const CompanyListSkeleton = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className='flex flex-col'>
          <CardHeader>
            <div className='flex justify-between items-start'>
              <Skeleton className='h-6 w-3/4' />
              <Skeleton className='h-5 w-24' />
            </div>
            <Skeleton className='h-4 w-full mt-2' />
            <Skeleton className='h-4 w-2/3 mt-1' />
          </CardHeader>
          <CardContent className='flex-grow'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-4/5 mt-2' />
          </CardContent>
          <CardFooter className='flex justify-between pt-4 border-t'>
            <Skeleton className='h-9 w-28' />
            <Skeleton className='h-9 w-28' />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
