'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { formatPrice } from '@/lib/format';
import type { Product } from '@/types';
import { getProducts } from '@/lib/data';

const tabs = ['최근 본 상품', '자주 사는 상품', '나의 찜'] as const;
type Tab = (typeof tabs)[number];

interface HistoryItem {
  product: Product;
  date: string;
}

function groupByDate(items: HistoryItem[]): Record<string, HistoryItem[]> {
  const groups: Record<string, HistoryItem[]> = {};
  for (const item of items) {
    if (!groups[item.date]) {
      groups[item.date] = [];
    }
    groups[item.date].push(item);
  }
  return groups;
}

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState<Tab>('최근 본 상품');
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    getProducts().then((products) => {
      const today = new Date().toISOString().split('T')[0];
      const items: HistoryItem[] = products.slice(0, 5).map((product) => ({
        product,
        date: today,
      }));
      setHistoryItems(items);
    });
  }, []);

  const handleDelete = (productId: number) => {
    setHistoryItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleDeleteAll = () => {
    setHistoryItems([]);
  };

  const grouped = groupByDate(historyItems);
  const dateKeys = Object.keys(grouped).sort().reverse();

  return (
    <div className="bg-surface min-h-screen">
      {/* 탭 */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
              activeTab === tab
                ? 'text-text-primary border-b-2 border-text-primary'
                : 'text-text-muted'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 안내 문구 + 전체삭제 */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-border">
        <span className="text-xs text-text-muted">
          회원은 최근 2주간 최대 50개까지 유지
        </span>
        <button
          type="button"
          onClick={handleDeleteAll}
          className="text-xs font-medium text-text-secondary hover:text-text-primary"
        >
          전체삭제
        </button>
      </div>

      {/* 콘텐츠 */}
      {activeTab === '최근 본 상품' && (
        <div>
          {historyItems.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-sm text-text-muted">최근 본 상품이 없습니다.</p>
            </div>
          ) : (
            dateKeys.map((date) => (
              <div key={date}>
                <div className="px-4 pt-4 pb-2">
                  <h3 className="text-sm font-bold text-text-primary">{date}</h3>
                </div>
                <ul>
                  {grouped[date].map(({ product }) => (
                    <li
                      key={product.id}
                      className="relative flex gap-3 px-4 py-3 border-b border-border"
                    >
                      <Link
                        href={`/product/${product.id}`}
                        className="flex gap-3 flex-1 min-w-0"
                      >
                        <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                            unoptimized
                          />
                          {product.tags.includes('베스트') && (
                            <span className="absolute top-1 left-1 bg-badge-red text-white text-[9px] font-bold px-1 py-0.5 rounded">
                              BEST
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col justify-center min-w-0">
                          <h4 className="text-sm text-text-primary line-clamp-2 leading-tight mb-1">
                            {product.name}
                          </h4>
                          <div className="flex items-baseline gap-1">
                            {product.discountRate > 0 && (
                              <span className="text-sm font-bold text-primary">
                                {product.discountRate}%
                              </span>
                            )}
                            <span className="text-sm font-bold text-text-primary">
                              {formatPrice(product.price)}
                            </span>
                          </div>
                        </div>
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        className="absolute top-3 right-3 p-1 text-text-muted hover:text-text-primary"
                        aria-label={`${product.name} 삭제`}
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === '자주 사는 상품' && (
        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-text-muted">자주 사는 상품이 없습니다.</p>
        </div>
      )}

      {activeTab === '나의 찜' && (
        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-text-muted">찜한 상품이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
