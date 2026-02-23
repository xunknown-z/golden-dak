'use client';

import { useState, useEffect } from 'react';
import type { UserProfile as UserProfileType, Order, Coupon } from '@/types';
import UserProfile from '@/components/mypage/UserProfile';
import OrderHistory from '@/components/mypage/OrderHistory';
import CouponSection from '@/components/mypage/CouponSection';
import PointSection from '@/components/mypage/PointSection';
import MenuList from '@/components/mypage/MenuList';
import { getUser, getOrders, getCoupons } from '@/lib/data';

const tabs = ['주문내역', '쿠폰', '적립금'] as const;
type Tab = typeof tabs[number];

export default function MyPage() {
  const [user, setUser] = useState<UserProfileType | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>('주문내역');

  useEffect(() => {
    getUser().then(setUser);
    getOrders().then(setOrders);
    getCoupons().then(setCoupons);
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-text-muted">
        로딩 중...
      </div>
    );
  }

  return (
    <>
      <UserProfile user={user} />

      <div className="flex border-b border-border bg-surface mt-2" role="tablist" aria-label="마이페이지 탭">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium text-center border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-primary text-primary'
                : 'border-transparent text-text-muted hover:text-text-secondary'
            }`}
            role="tab"
            aria-selected={activeTab === tab}
          >
            {tab}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {activeTab === '주문내역' && <OrderHistory orders={orders} />}
        {activeTab === '쿠폰' && <CouponSection coupons={coupons} />}
        {activeTab === '적립금' && <PointSection point={user.point} />}
      </div>

      <div className="mt-2 border-t-4 border-gray-100">
        <MenuList />
      </div>
    </>
  );
}
