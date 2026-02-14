'use client';

import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import type { CartItem as CartItemType } from '@/types';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/lib/format';

interface CartItemProps {
  item: CartItemType;
  checked: boolean;
  onToggleCheck: () => void;
}

export default function CartItemComponent({ item, checked, onToggleCheck }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-3 px-4 py-4 border-b border-border">
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggleCheck}
        className="mt-1 w-5 h-5 accent-primary shrink-0"
        aria-label={`${item.product.name} 선택`}
      />

      <div className="w-20 h-20 shrink-0 bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-2xl text-gray-300">{item.product.name.charAt(0)}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-sm font-medium text-text-primary line-clamp-1 pr-2">
            {item.product.name}
          </h3>
          <button
            type="button"
            onClick={() => removeItem(item.product.id, item.selectedOption.id)}
            className="p-0.5 text-text-muted hover:text-text-primary shrink-0"
            aria-label="삭제"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-text-muted mb-2">{item.selectedOption.name}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => updateQuantity(item.product.id, item.selectedOption.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="w-7 h-7 flex items-center justify-center border border-border rounded disabled:opacity-40"
              aria-label="수량 감소"
            >
              <MinusIcon className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
            <button
              type="button"
              onClick={() => updateQuantity(item.product.id, item.selectedOption.id, item.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center border border-border rounded"
              aria-label="수량 증가"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>

          <span className="text-sm font-bold text-text-primary">
            {formatPrice(item.selectedOption.price * item.quantity)}원
          </span>
        </div>
      </div>
    </div>
  );
}
