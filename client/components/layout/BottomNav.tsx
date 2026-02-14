'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon as HomeOutline,
  Squares2X2Icon as CategoryOutline,
  MagnifyingGlassIcon as SearchOutline,
  UserIcon as UserOutline,
  ClockIcon as HistoryOutline,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeSolid,
  Squares2X2Icon as CategorySolid,
  MagnifyingGlassIcon as SearchSolid,
  UserIcon as UserSolid,
  ClockIcon as HistorySolid,
} from '@heroicons/react/24/solid';

const tabs = [
  { href: '/category', label: '카테고리', IconOutline: CategoryOutline, IconSolid: CategorySolid },
  { href: '/search', label: '검색', IconOutline: SearchOutline, IconSolid: SearchSolid },
  { href: '/', label: '홈', IconOutline: HomeOutline, IconSolid: HomeSolid },
  { href: '/mypage', label: '마이페이지', IconOutline: UserOutline, IconSolid: UserSolid },
  { href: '/history', label: '히스토리', IconOutline: HistoryOutline, IconSolid: HistorySolid },
];

const hiddenRoutes = ['/product/', '/cart'];

export default function BottomNav() {
  const pathname = usePathname();

  const isHidden = hiddenRoutes.some((route) =>
    route.endsWith('/') ? pathname.startsWith(route) : pathname === route
  );

  if (isHidden) return null;

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-surface border-t border-border z-50"
      role="navigation"
      aria-label="하단 네비게이션"
    >
      <ul className="flex items-center justify-around h-16">
        {tabs.map(({ href, label, IconOutline, IconSolid }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
          const Icon = isActive ? IconSolid : IconOutline;

          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 text-xs ${
                  isActive ? 'text-primary font-semibold' : 'text-text-muted'
                }`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={label}
              >
                <Icon className="w-6 h-6" />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
