# Golden-Dak 구현 계획

## Context
랭킹닭컴 클론 코딩 프로젝트. 모바일 퍼스트 커머스 템플릿 사이트를 Next.js App Router + Tailwind CSS + Zustand로 구현. Mock 데이터를 활용하며, 단계별로 점진적 개발 진행.

---

## Phase 1: 프로젝트 스캐폴딩

Next.js 프로젝트 생성 및 기본 설정.

**작업:**
- `client/` 디렉터리에 Next.js 15 App Router 프로젝트 생성 (TypeScript + Tailwind CSS)
- 추가 의존성 설치: `zustand`, `swiper`, `framer-motion`, `@heroicons/react`
- `server/` 빈 디렉터리 생성 (placeholder)
- Tailwind 커스텀 설정 (모바일 퍼스트 breakpoints, 커스텀 색상)
- 기본 폴더 구조 생성

**생성 파일:**
```
client/
├── app/
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 홈 페이지
│   └── globals.css         # 글로벌 스타일 + Tailwind directives
├── components/             # 공통 컴포넌트
├── stores/                 # Zustand 스토어
├── types/                  # TypeScript 타입 정의
├── lib/                    # 유틸리티 함수
├── public/
│   └── data/               # Mock JSON 데이터
├── tailwind.config.ts
├── next.config.ts
└── package.json
server/                     # placeholder
docs/
└── plan.md                 # 이 계획서 복사
```

---

## Phase 2: 레이아웃 & 네비게이션

앱 전체 셸 구축 — 상단 헤더 + 하단 탭바 + 메인 콘텐츠 영역.

**생성 파일:**
- `client/app/layout.tsx` — 루트 레이아웃 (max-w-[480px] 센터 정렬, 모바일 앱 느낌)
- `client/components/layout/Header.tsx` — 로고, 검색바, 장바구니 아이콘 (장바구니 수량 뱃지)
- `client/components/layout/BottomNav.tsx` — 하단 고정 탭바 (홈/카테고리/마이페이지/AI식단), Heroicons Outline/Solid 토글
- `client/components/layout/MobileContainer.tsx` — 모바일 컨테이너 래퍼 (max-width 제한 + 센터링)

**구현 세부사항:**
- 하단 탭바: `fixed bottom-0`, 4개 탭 (홈, 카테고리, 마이페이지, AI식단)
- 상단 헤더: `sticky top-0 z-50`, 로고 + 검색 아이콘 + 장바구니 아이콘
- 본문: `pb-16 pt-14` (헤더/탭바 높이만큼 패딩)
- pathname 기반으로 현재 탭 하이라이트 (usePathname)

---

## Phase 3: Mock 데이터 & 타입 정의

TypeScript 인터페이스 및 Mock JSON 데이터 생성.

**타입 정의 (`client/types/index.ts`):**
```typescript
interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  discountRate: number
  image: string
  category: string
  rating: number
  reviewCount: number
  tags: string[]
  description: string
  options: ProductOption[]
}

interface ProductOption {
  id: number
  name: string
  price: number
}

interface CartItem {
  product: Product
  selectedOption: ProductOption
  quantity: number
}

interface Category {
  id: number
  name: string
  slug: string
  icon: string
}

interface Review {
  id: number
  productId: number
  userName: string
  rating: number
  content: string
  date: string
  images?: string[]
}

interface Banner {
  id: number
  image: string
  title: string
  link: string
}
```

**Mock 데이터 파일:**
- `client/public/data/products.json` — 상품 20~30개 (닭가슴살, 소시지, 스테이크, 볼 등)
- `client/public/data/categories.json` — 카테고리 목록
- `client/public/data/banners.json` — 메인 배너 3~5개
- `client/public/data/reviews.json` — 리뷰 데이터

**데이터 fetch 유틸 (`client/lib/data.ts`):**
- `getProducts()`, `getProduct(id)`, `getCategories()`, `getBanners()`, `getReviews(productId)` 함수

---

## Phase 4: 홈 / 상품 리스트 페이지

메인 페이지와 카테고리별 상품 리스트.

**생성 파일:**
- `client/app/page.tsx` — 홈 페이지 (배너 슬라이더 + 인기 상품 + 카테고리 바로가기)
- `client/app/category/page.tsx` — 카테고리/랭킹 상품 리스트
- `client/components/home/BannerSlider.tsx` — Swiper.js 배너 슬라이더 (자동재생, 페이지네이션)
- `client/components/home/CategoryGrid.tsx` — 카테고리 아이콘 그리드
- `client/components/home/PopularProducts.tsx` — 인기 상품 섹션
- `client/components/product/ProductCard.tsx` — 상품 카드 (이미지, 할인율 뱃지, 가격, 별점)
- `client/components/product/ProductList.tsx` — 상품 리스트 (그리드 2열)
- `client/components/product/SortFilter.tsx` — 정렬 필터 (인기순/가격순/할인율순)
- `client/components/product/CategoryTabs.tsx` — 카테고리 탭 필터링

**구현 세부사항:**
- 상품 카드: 할인율 뱃지 (빨간색), 원래가격 취소선, 할인가 볼드, 별점 + 리뷰수
- 정렬: 인기순(기본), 낮은가격순, 높은가격순, 할인율순
- 카테고리 필터: 상단 수평 스크롤 탭
- 배너: Swiper autoplay + pagination dots

---

## Phase 5: 상품 상세 페이지

**생성 파일:**
- `client/app/product/[id]/page.tsx` — 상품 상세 페이지
- `client/components/detail/ProductImageSlider.tsx` — 상품 이미지 슬라이더
- `client/components/detail/ProductInfo.tsx` — 상품 정보 (이름, 가격, 할인, 배송정보)
- `client/components/detail/OptionSelector.tsx` — 옵션 선택 UI
- `client/components/detail/DetailTabs.tsx` — 상세/리뷰/문의 탭
- `client/components/detail/ReviewList.tsx` — 리뷰 리스트
- `client/components/detail/AddToCartBar.tsx` — 하단 고정 구매/장바구니 버튼

**구현 세부사항:**
- 이미지 슬라이더: Swiper, 1/N 인디케이터
- 옵션 선택: 드롭다운/칩 방식, 선택 시 가격 변동 표시
- 탭: 상세정보 / 리뷰(N) / 문의 — sticky 탭 헤더
- 하단 바: 찜하기 ♡ + 장바구니 담기 + 구매하기 버튼

---

## Phase 6: 장바구니 (Zustand)

**생성 파일:**
- `client/stores/cartStore.ts` — Zustand 장바구니 스토어
- `client/app/cart/page.tsx` — 장바구니 페이지
- `client/components/cart/CartItem.tsx` — 장바구니 아이템 (체크박스, 이미지, 수량 조절, 삭제)
- `client/components/cart/CartSummary.tsx` — 주문 요약 (상품금액, 할인, 배송비, 총액)
- `client/components/cart/OrderButton.tsx` — 주문하기 버튼 (하단 고정)

**Zustand 스토어 구조:**
```typescript
interface CartStore {
  items: CartItem[]
  addItem: (product: Product, option: ProductOption, quantity: number) => void
  removeItem: (productId: number, optionId: number) => void
  updateQuantity: (productId: number, optionId: number, quantity: number) => void
  clearCart: () => void
  totalPrice: () => number
  totalCount: () => number
}
```

---

## Phase 7: 마이페이지

**생성 파일:**
- `client/app/mypage/page.tsx` — 마이페이지
- `client/components/mypage/UserProfile.tsx` — 사용자 프로필 (Mock)
- `client/components/mypage/OrderHistory.tsx` — 주문 내역
- `client/components/mypage/CouponSection.tsx` — 쿠폰함
- `client/components/mypage/PointSection.tsx` — 적립금
- `client/components/mypage/MenuList.tsx` — 설정 메뉴 리스트

---

## Phase 8: 마무리 (Skeleton UI, 애니메이션, SEO, 접근성)

**생성 파일:**
- `client/app/loading.tsx` — 루트 로딩 UI
- `client/app/category/loading.tsx` — 카테고리 페이지 로딩
- `client/app/product/[id]/loading.tsx` — 상품 상세 로딩
- `client/components/skeleton/ProductCardSkeleton.tsx`
- `client/components/skeleton/ProductDetailSkeleton.tsx`

**작업:**
- 각 페이지에 metadata export (title, description, og tags)
- ARIA 속성 추가 (role, aria-label, aria-current)
- 키보드 네비게이션 지원
- Framer Motion으로 페이지 전환/스크롤 애니메이션
- 호버 효과 (상품 카드 scale, 버튼 색상 전환)
- 최종 반응형 점검 (모바일 320px ~ 데스크톱 1200px+)

---

## 검증 방법

1. `cd client && npm run dev` — 개발 서버 실행 확인
2. 모바일 뷰포트(375px)에서 전체 플로우 확인: 홈 → 카테고리 → 상품 상세 → 장바구니 담기 → 장바구니 페이지
3. `npm run build` — 빌드 에러 없는지 확인
4. `npm run lint` — 린트 통과 확인
