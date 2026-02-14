import { ChevronRightIcon } from '@heroicons/react/24/outline';

const menuItems = [
  { label: '주문/배송 조회', href: '#' },
  { label: '찜한 상품', href: '#' },
  { label: '최근 본 상품', href: '#' },
  { label: '1:1 문의', href: '#' },
  { label: '공지사항', href: '#' },
  { label: '이용약관', href: '#' },
  { label: '로그아웃', href: '#' },
];

export default function MenuList() {
  return (
    <nav aria-label="마이페이지 메뉴">
      <ul className="divide-y divide-border">
        {menuItems.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="flex items-center justify-between px-4 py-4 text-sm text-text-primary hover:bg-gray-50 transition-colors"
            >
              <span>{item.label}</span>
              <ChevronRightIcon className="w-4 h-4 text-text-muted" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
