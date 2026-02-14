'use client';

import { useState } from 'react';
import type { Review } from '@/types';
import ReviewList from './ReviewList';

interface DetailTabsProps {
  description: string;
  reviews: Review[];
}

const tabs = ['상세정보', '리뷰', '문의'] as const;
type Tab = typeof tabs[number];

export default function DetailTabs({ description, reviews }: DetailTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('상세정보');

  return (
    <div>
      <div className="sticky top-14 z-40 bg-surface border-b border-border" role="tablist" aria-label="상품 정보 탭">
        <div className="flex">
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
              {tab === '리뷰' && ` (${reviews.length})`}
            </button>
          ))}
        </div>
      </div>

      <div role="tabpanel">
        {activeTab === '상세정보' && (
          <div className="px-4 py-6">
            <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>
        )}
        {activeTab === '리뷰' && <ReviewList reviews={reviews} />}
        {activeTab === '문의' && (
          <div className="flex items-center justify-center py-16 text-text-muted text-sm">
            등록된 문의가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
