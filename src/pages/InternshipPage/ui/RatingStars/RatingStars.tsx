import { Star } from 'lucide-react';

export const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className='flex'>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
};
