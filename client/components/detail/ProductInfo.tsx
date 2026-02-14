import { StarIcon } from '@heroicons/react/24/solid';
import { TruckIcon } from '@heroicons/react/24/outline';
import type { Product } from '@/types';
import { formatPrice, formatRating } from '@/lib/format';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-1 text-sm text-text-secondary mb-2">
        <StarIcon className="w-4 h-4 text-star" />
        <span className="font-medium">{formatRating(product.rating)}</span>
        <span className="text-text-muted">({product.reviewCount.toLocaleString()}개 리뷰)</span>
      </div>

      <h1 className="text-lg font-bold text-text-primary leading-tight mb-3">
        {product.name}
      </h1>

      <div className="flex items-baseline gap-2 mb-1">
        {product.discountRate > 0 && (
          <span className="text-xl font-bold text-primary">{product.discountRate}%</span>
        )}
        <span className="text-2xl font-bold text-text-primary">
          {formatPrice(product.price)}원
        </span>
      </div>

      {product.discountRate > 0 && (
        <p className="text-sm text-text-muted line-through mb-3">
          {formatPrice(product.originalPrice)}원
        </p>
      )}

      <div className="flex items-center gap-2 py-3 border-t border-border text-sm text-text-secondary">
        <TruckIcon className="w-5 h-5" />
        <span>3,000원 (30,000원 이상 무료배송)</span>
      </div>

      {product.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-text-secondary border border-border rounded px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
