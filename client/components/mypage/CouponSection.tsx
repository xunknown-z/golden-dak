import type { Coupon } from '@/types';
import { formatPrice } from '@/lib/format';

interface CouponSectionProps {
  coupons: Coupon[];
}

export default function CouponSection({ coupons }: CouponSectionProps) {
  if (coupons.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-text-muted text-sm">
        보유 쿠폰이 없습니다.
      </div>
    );
  }

  return (
    <div className="px-4 py-4 space-y-3">
      {coupons.map((coupon) => (
        <div
          key={coupon.id}
          className="relative border border-border rounded-lg p-4 bg-surface overflow-hidden"
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
          <div className="flex items-center justify-between mb-1">
            <span className="text-lg font-bold text-primary">
              {coupon.discountType === 'percent'
                ? `${coupon.discount}%`
                : `${formatPrice(coupon.discount)}원`}
            </span>
          </div>
          <p className="text-sm font-medium text-text-primary mb-1">{coupon.name}</p>
          <p className="text-xs text-text-muted">
            {formatPrice(coupon.minOrderAmount)}원 이상 구매 시 · ~{coupon.expiryDate}
          </p>
        </div>
      ))}
    </div>
  );
}
