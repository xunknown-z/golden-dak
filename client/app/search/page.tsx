'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { formatPrice } from '@/lib/format';
import type { Product } from '@/types';
import { getSearchKeywords, getProducts } from '@/lib/data';

interface SearchData {
  popularKeywords: string[];
  recommendedKeywords: string[];
}

export default function SearchPage() {
  const [searchData, setSearchData] = useState<SearchData | null>(null);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [popularPage, setPopularPage] = useState(0);

  useEffect(() => {
    getSearchKeywords().then(setSearchData);
    getProducts().then((products) => {
      setRecentProducts(products.slice(0, 3));
    });
  }, []);

  const totalPages = searchData
    ? Math.ceil(searchData.popularKeywords.length / 10)
    : 1;

  const currentKeywords = searchData
    ? searchData.popularKeywords.slice(popularPage * 10, popularPage * 10 + 10)
    : [];
  const leftColumn = currentKeywords.slice(0, 5);
  const rightColumn = currentKeywords.slice(5, 10);

  return (
    <div className="bg-surface min-h-screen">
      {/* 최근 검색어 */}
      <section className="px-4 pt-5 pb-4 border-b border-border">
        <h2 className="text-base font-bold text-text-primary mb-3">최근 검색어</h2>
        <p className="text-sm text-text-muted">최근 검색어가 없습니다.</p>
      </section>

      {/* 인기 검색어 */}
      <section className="px-4 pt-5 pb-4 border-b border-border">
        <h2 className="text-base font-bold text-text-primary mb-4">인기 검색어</h2>
        <div className="flex gap-4">
          {/* 왼쪽 열 */}
          <div className="flex-1 flex flex-col gap-3">
            {leftColumn.map((keyword, i) => (
              <div key={keyword} className="flex items-center gap-3">
                <span className="text-sm font-bold text-primary w-5 text-center">
                  {popularPage * 10 + i + 1}
                </span>
                <span className="text-sm text-text-primary">{keyword}</span>
              </div>
            ))}
          </div>
          {/* 오른쪽 열 */}
          <div className="flex-1 flex flex-col gap-3">
            {rightColumn.map((keyword, i) => (
              <div key={keyword} className="flex items-center gap-3">
                <span className="text-sm font-bold text-primary w-5 text-center">
                  {popularPage * 10 + i + 6}
                </span>
                <span className="text-sm text-text-primary">{keyword}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 페이지네이션 dots */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-1.5 mt-5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPopularPage(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === popularPage ? 'bg-primary' : 'bg-gray-300'
                }`}
                aria-label={`인기 검색어 ${i + 1}페이지`}
              />
            ))}
          </div>
        )}
      </section>

      {/* 추천 검색어 */}
      <section className="px-4 pt-5 pb-4 border-b border-border">
        <h2 className="text-base font-bold text-text-primary mb-3">추천 검색어</h2>
        <div className="flex flex-wrap gap-2">
          {searchData?.recommendedKeywords.map((keyword) => (
            <span
              key={keyword}
              className="px-3 py-1.5 text-sm text-primary border border-primary rounded-full cursor-pointer hover:bg-primary/5"
            >
              #{keyword}
            </span>
          ))}
        </div>
      </section>

      {/* 최근 본 상품 */}
      <section className="px-4 pt-5 pb-6">
        <h2 className="text-base font-bold text-text-primary mb-3">최근 본 상품</h2>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {recentProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="flex-shrink-0 w-[140px]"
              aria-label={`${product.name} - ${formatPrice(product.price)}원`}
            >
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="140px"
                  unoptimized
                />
                {product.tags.includes('베스트') && (
                  <span className="absolute top-1.5 left-1.5 bg-badge-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    타임특가
                  </span>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="absolute bottom-1.5 right-1.5 w-7 h-7 flex items-center justify-center bg-white/90 rounded-lg shadow-sm"
                  aria-label={`${product.name} 장바구니 담기`}
                >
                  <ShoppingCartIcon className="w-4 h-4 text-text-secondary" />
                </button>
              </div>
              <h3 className="text-xs text-text-primary line-clamp-2 leading-tight mb-1">
                {product.name}
              </h3>
              <div className="flex items-baseline gap-1">
                {product.discountRate > 0 && (
                  <span className="text-sm font-bold text-primary">{product.discountRate}%</span>
                )}
                <span className="text-sm font-bold text-text-primary">
                  {formatPrice(product.price)}원
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
