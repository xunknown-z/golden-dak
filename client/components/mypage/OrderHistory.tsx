import type { Order } from '@/types';
import { formatPrice } from '@/lib/format';

interface OrderHistoryProps {
  orders: Order[];
}

function statusColor(status: string) {
  switch (status) {
    case '배송완료':
      return 'text-green-600';
    case '배송중':
      return 'text-blue-600';
    default:
      return 'text-text-secondary';
  }
}

export default function OrderHistory({ orders }: OrderHistoryProps) {
  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-text-muted text-sm">
        주문 내역이 없습니다.
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {orders.map((order) => (
        <div key={order.id} className="px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-muted">{order.date}</span>
            <span className={`text-xs font-medium ${statusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-1">
              <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center shrink-0">
                <span className="text-sm text-gray-300">{item.productName.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary line-clamp-1">{item.productName}</p>
                <p className="text-xs text-text-muted">
                  {item.optionName} · {item.quantity}개
                </p>
              </div>
              <span className="text-sm font-medium text-text-primary shrink-0">
                {formatPrice(item.price)}원
              </span>
            </div>
          ))}
          <div className="flex justify-end mt-2 pt-2 border-t border-border">
            <span className="text-sm font-bold text-text-primary">
              총 {formatPrice(order.totalPrice)}원
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
