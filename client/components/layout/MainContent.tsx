'use client';

import { usePathname } from 'next/navigation';

const noBottomPaddingRoutes = ['/product/', '/cart'];

export default function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideBottomPadding = noBottomPaddingRoutes.some((route) =>
    route.endsWith('/') ? pathname.startsWith(route) : pathname === route
  );

  return (
    <main className={hideBottomPadding ? '' : 'pb-16'}>
      {children}
    </main>
  );
}
