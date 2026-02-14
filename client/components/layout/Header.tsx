'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeftIcon, MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '@/stores/cartStore';

const subPageTitles: Record<string, string> = {
  '/cart': '장바구니',
};

function CartIcon() {
  const totalCount = useCartStore((state) => state.totalCount());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link href="/cart" className="relative flex-shrink-0 p-2 text-text-secondary hover:text-text-primary overflow-visible" aria-label="장바구니">
      <ShoppingCartIcon className="w-6 h-6" />
      {mounted && totalCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-5 h-5 text-[11px] font-bold text-white bg-badge-red rounded-full">
          {totalCount > 99 ? '99+' : totalCount}
        </span>
      )}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const subPageTitle = subPageTitles[pathname];
  const isSearchPage = pathname === '/search';
  const isProductDetail = pathname.startsWith('/product/');
  const isHistoryPage = pathname === '/history';

  // 검색 페이지 헤더
  if (isSearchPage) {
    return (
      <header className="z-50 bg-surface border-b border-border overflow-visible" role="banner">
        <div className="flex items-center h-14 px-2 gap-2 overflow-visible">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 text-text-primary hover:text-text-secondary flex-shrink-0"
            aria-label="뒤로가기"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>

          <div className="flex-1 min-w-0 relative">
            <input
              type="text"
              placeholder="검색어를 입력해 주세요."
              className="w-full h-10 pl-3 pr-10 text-sm bg-gray-100 rounded-lg border-none outline-none placeholder:text-text-muted focus:ring-1 focus:ring-primary"
              aria-label="검색어 입력"
              autoFocus
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-text-secondary"
              aria-label="검색"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
          </div>

          <CartIcon />
        </div>
      </header>
    );
  }

  // 상품 상세 페이지 헤더
  if (isProductDetail) {
    return (
      <header className="z-50 bg-surface border-b border-border" role="banner">
        <div className="relative flex items-center justify-center h-14">
          <button
            type="button"
            onClick={() => router.back()}
            className="absolute left-2 p-2 text-text-primary hover:text-text-secondary"
            aria-label="뒤로가기"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <Link href="/" className="text-lg font-bold text-primary" aria-label="골든닭 홈">
            골든닭
          </Link>
          <div className="absolute right-2 flex items-center gap-1">
            <Link
              href="/search"
              className="p-2 text-text-secondary hover:text-text-primary"
              aria-label="검색"
            >
              <MagnifyingGlassIcon className="w-6 h-6" />
            </Link>
            <CartIcon />
          </div>
        </div>
      </header>
    );
  }

  // 히스토리 페이지 헤더
  if (isHistoryPage) {
    return (
      <header className="z-50 bg-surface border-b border-border" role="banner">
        <div className="relative flex items-center justify-center h-14">
          <button
            type="button"
            onClick={() => router.back()}
            className="absolute left-2 p-2 text-text-primary hover:text-text-secondary"
            aria-label="뒤로가기"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-base font-semibold text-text-primary">히스토리</h1>
          <div className="absolute right-2 flex items-center gap-1">
            <Link
              href="/search"
              className="p-2 text-text-secondary hover:text-text-primary"
              aria-label="검색"
            >
              <MagnifyingGlassIcon className="w-6 h-6" />
            </Link>
            <CartIcon />
          </div>
        </div>
      </header>
    );
  }

  // 서브 페이지 헤더
  if (subPageTitle) {
    return (
      <header className="z-50 bg-surface border-b border-border" role="banner">
        <div className="relative flex items-center justify-center h-14">
          <button
            type="button"
            onClick={() => router.back()}
            className="absolute left-2 p-2 text-text-primary hover:text-text-secondary"
            aria-label="뒤로가기"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-base font-semibold text-text-primary">{subPageTitle}</h1>
        </div>
      </header>
    );
  }

  // 기본 헤더
  return (
    <header className="z-50 bg-surface border-b border-border" role="banner">
      <div className="flex items-center justify-between h-14 px-4">
        <Link href="/" className="text-xl font-bold text-primary" aria-label="골든닭 홈">
          골든닭
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/search"
            className="p-2 text-text-secondary hover:text-text-primary"
            aria-label="검색"
          >
            <MagnifyingGlassIcon className="w-6 h-6" />
          </Link>

          <CartIcon />
        </div>
      </div>
    </header>
  );
}
