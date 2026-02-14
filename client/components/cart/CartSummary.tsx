import { formatPrice } from '@/lib/format';

interface CartSummaryProps {
  productTotal: number;
  discountTotal: number;
  shippingFee: number;
}

export default function CartSummary({ productTotal, discountTotal, shippingFee }: CartSummaryProps) {
  const totalPrice = productTotal - discountTotal + shippingFee;

  return (
    <div className="mx-4 my-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-sm font-semibold text-text-primary mb-3">주문 요약</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-text-secondary">상품금액</span>
          <span className="text-text-primary">{formatPrice(productTotal)}원</span>
        </div>
        {discountTotal > 0 && (
          <div className="flex justify-between">
            <span className="text-text-secondary">할인금액</span>
            <span className="text-primary">-{formatPrice(discountTotal)}원</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-text-secondary">배송비</span>
          <span className="text-text-primary">
            {shippingFee === 0 ? '무료' : `${formatPrice(shippingFee)}원`}
          </span>
        </div>
        <div className="flex justify-between pt-3 border-t border-border">
          <span className="font-semibold text-text-primary">총 결제금액</span>
          <span className="text-lg font-bold text-primary">{formatPrice(totalPrice)}원</span>
        </div>
      </div>
    </div>
  );
}
