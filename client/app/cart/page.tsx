'use client';

import { useState, useMemo } from 'react';
import { useCartStore } from '@/stores/cartStore';
import CartItemComponent from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import OrderButton from '@/components/cart/OrderButton';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function CartPage() {
  const { items, clearCart } = useCartStore();
  const [checkedIds, setCheckedIds] = useState<Set<string>>(
    () => new Set(items.map((item) => `${item.product.id}-${item.selectedOption.id}`))
  );

  const toggleCheck = (key: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const toggleAll = () => {
    if (checkedIds.size === items.length) {
      setCheckedIds(new Set());
    } else {
      setCheckedIds(new Set(items.map((item) => `${item.product.id}-${item.selectedOption.id}`)));
    }
  };

  const checkedItems = useMemo(
    () => items.filter((item) => checkedIds.has(`${item.product.id}-${item.selectedOption.id}`)),
    [items, checkedIds]
  );

  const productTotal = useMemo(
    () => checkedItems.reduce((sum, item) => sum + item.selectedOption.price * item.quantity, 0),
    [checkedItems]
  );

  const discountTotal = useMemo(
    () =>
      checkedItems.reduce(
        (sum, item) =>
          sum + (item.product.originalPrice - item.product.price) * item.quantity,
        0
      ),
    [checkedItems]
  );

  const shippingFee = productTotal >= 30000 || productTotal === 0 ? 0 : 3000;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-text-muted">
        <ShoppingCartIcon className="w-16 h-16" />
        <p className="text-sm">장바구니가 비어있습니다.</p>
      </div>
    );
  }

  return (
    <div className="pb-28">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={checkedIds.size === items.length}
            onChange={toggleAll}
            className="w-5 h-5 accent-primary"
          />
          전체선택 ({checkedIds.size}/{items.length})
        </label>
        <button
          type="button"
          onClick={clearCart}
          className="text-sm text-text-muted hover:text-text-secondary"
        >
          전체삭제
        </button>
      </div>

      {items.map((item) => {
        const key = `${item.product.id}-${item.selectedOption.id}`;
        return (
          <CartItemComponent
            key={key}
            item={item}
            checked={checkedIds.has(key)}
            onToggleCheck={() => toggleCheck(key)}
          />
        );
      })}

      <CartSummary
        productTotal={productTotal}
        discountTotal={discountTotal}
        shippingFee={shippingFee}
      />

      <OrderButton
        totalPrice={productTotal - discountTotal + shippingFee}
        itemCount={checkedItems.reduce((sum, item) => sum + item.quantity, 0)}
        disabled={checkedItems.length === 0}
      />
    </div>
  );
}
