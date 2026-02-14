import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import type { Review } from '@/types';

interface ReviewListProps {
  reviews: Review[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`별점 ${rating}점`}>
      {[1, 2, 3, 4, 5].map((star) => (
        star <= rating ? (
          <StarIcon key={star} className="w-3.5 h-3.5 text-star" />
        ) : (
          <StarOutline key={star} className="w-3.5 h-3.5 text-gray-300" />
        )
      ))}
    </div>
  );
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 text-text-muted text-sm">
        아직 리뷰가 없습니다.
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {reviews.map((review) => (
        <div key={review.id} className="px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-text-primary">{review.userName}</span>
              <StarRating rating={review.rating} />
            </div>
            <span className="text-xs text-text-muted">{review.date}</span>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">{review.content}</p>
        </div>
      ))}
    </div>
  );
}
