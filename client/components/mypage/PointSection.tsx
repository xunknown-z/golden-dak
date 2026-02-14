import { formatPrice } from '@/lib/format';

interface PointSectionProps {
  point: number;
}

export default function PointSection({ point }: PointSectionProps) {
  return (
    <div className="px-4 py-6">
      <div className="bg-gray-50 rounded-lg p-5 text-center">
        <p className="text-sm text-text-secondary mb-2">보유 적립금</p>
        <p className="text-2xl font-bold text-text-primary">{formatPrice(point)}원</p>
        <p className="text-xs text-text-muted mt-2">
          적립금은 1,000원 이상부터 사용 가능합니다.
        </p>
      </div>
    </div>
  );
}
