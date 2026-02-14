'use client';

import { formatPrice } from '@/lib/format';

interface OrderButtonProps {
  totalPrice: number;
  itemCount: number;
  disabled: boolean;
}

export default function OrderButton({ totalPrice, itemCount, disabled }: OrderButtonProps) {
  return (
    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-surface border-t border-border px-4 py-3 z-40">
      <button
        type="button"
        disabled={disabled}
        className="w-full h-12 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        {disabled
          ? '상품을 선택해주세요'
          : `${formatPrice(totalPrice)}원 주문하기 (${itemCount}개)`}
      </button>
    </div>
  );
}
