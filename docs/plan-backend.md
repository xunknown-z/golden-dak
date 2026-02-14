# Golden-Dak 백엔드 구현 계획

## 개요

프론트엔드(client/)에서 현재 `public/data/*.json` 파일로 직접 데이터를 fetch하는 구조를,
NestJS + MySQL 기반 REST API 서버로 전환하기 위한 단계별 구현 계획.

---

## 기술 스택

| 항목 | 기술 |
|------|------|
| 프레임워크 | NestJS |
| 언어 | TypeScript |
| 데이터베이스 | MySQL 8.0 (Docker) |
| ORM | TypeORM |
| 유효성 검증 | class-validator, class-transformer |
| API 문서 | Swagger (nestjs/swagger) |
| 컨테이너 | Docker + Docker Compose |

---

## 데이터베이스 스키마

프론트엔드의 타입 정의(`client/types/index.ts`)를 기반으로 설계.

### ERD

```
┌──────────────┐     ┌──────────────────┐
│  categories  │     │    products       │
├──────────────┤     ├──────────────────┤
│ id (PK)      │◄────│ category_id (FK) │
│ name         │     │ id (PK)          │
│ slug         │     │ name             │
│ icon         │     │ price            │
└──────────────┘     │ original_price   │
                     │ discount_rate    │
                     │ image            │
                     │ rating           │
                     │ review_count     │
                     │ description      │
                     └──────┬───────────┘
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
┌──────────────────┐ ┌───────────┐ ┌───────────────┐
│ product_options  │ │  reviews  │ │ product_tags  │
├──────────────────┤ ├───────────┤ ├───────────────┤
│ id (PK)          │ │ id (PK)   │ │ id (PK)       │
│ product_id (FK)  │ │ product_id│ │ product_id(FK)│
│ name             │ │ user_name │ │ tag_name      │
│ price            │ │ rating    │ └───────────────┘
└──────────────────┘ │ content   │
                     │ date      │
                     └───────────┘

┌──────────────┐  ┌─────────────────┐  ┌───────────────┐
│   banners    │  │     users       │  │   coupons     │
├──────────────┤  ├─────────────────┤  ├───────────────┤
│ id (PK)      │  │ id (PK)         │  │ id (PK)       │
│ image        │  │ name            │  │ user_id (FK)  │
│ title        │  │ email           │  │ name          │
│ link         │  │ password        │  │ discount      │
│ sort_order   │  │ grade           │  │ discount_type │
└──────────────┘  │ point           │  │ min_order_amt │
                  └────────┬────────┘  │ expiry_date   │
                           │           └───────────────┘
                           ▼
                  ┌─────────────────┐  ┌───────────────┐
                  │     orders      │  │  order_items  │
                  ├─────────────────┤  ├───────────────┤
                  │ id (PK)         │  │ id (PK)       │
                  │ user_id (FK)    │  │ order_id (FK) │
                  │ date            │  │ product_id    │
                  │ status          │  │ product_name  │
                  │ total_price     │  │ option_name   │
                  └─────────────────┘  │ quantity      │
                                       │ price         │
                                       │ image         │
                                       └───────────────┘

┌──────────────────┐
│ review_images    │
├──────────────────┤
│ id (PK)          │
│ review_id (FK)   │
│ image_url        │
└──────────────────┘

┌──────────────────┐
│ search_keywords  │
├──────────────────┤
│ id (PK)          │
│ keyword          │
│ type             │  ← 'popular' | 'recommended'
│ sort_order       │
└──────────────────┘
```

---

## API 엔드포인트

프론트엔드 `lib/data.ts`의 함수 호출 패턴에 맞춰 설계.

### 상품 (Products)

| Method | Endpoint | 설명 | 대응 함수 |
|--------|----------|------|-----------|
| GET | `/api/products` | 전체 상품 목록 | `getProducts()` |
| GET | `/api/products?category=닭가슴살` | 카테고리별 상품 | `getProductsByCategory()` |
| GET | `/api/products?sort=popular\|price_asc\|price_desc\|discount` | 정렬 | 카테고리 페이지 정렬 |
| GET | `/api/products/:id` | 상품 상세 | `getProduct(id)` |

### 카테고리 (Categories)

| Method | Endpoint | 설명 | 대응 함수 |
|--------|----------|------|-----------|
| GET | `/api/categories` | 전체 카테고리 목록 | `getCategories()` |

### 배너 (Banners)

| Method | Endpoint | 설명 | 대응 함수 |
|--------|----------|------|-----------|
| GET | `/api/banners` | 배너 목록 | `getBanners()` |

### 리뷰 (Reviews)

| Method | Endpoint | 설명 | 대응 함수 |
|--------|----------|------|-----------|
| GET | `/api/reviews?productId=1` | 상품별 리뷰 목록 | `getReviews(productId)` |
| GET | `/api/reviews` | 전체 리뷰 목록 | `getReviews()` |

### 사용자 (Users)

| Method | Endpoint | 설명 | 대응 데이터 |
|--------|----------|------|-------------|
| GET | `/api/users/me` | 내 프로필 조회 | `user.json` |

### 주문 (Orders)

| Method | Endpoint | 설명 | 대응 데이터 |
|--------|----------|------|-------------|
| GET | `/api/orders` | 내 주문 내역 | `orders.json` |

### 쿠폰 (Coupons)

| Method | Endpoint | 설명 | 대응 데이터 |
|--------|----------|------|-------------|
| GET | `/api/coupons` | 내 쿠폰 목록 | `coupons.json` |

### 검색 (Search)

| Method | Endpoint | 설명 | 대응 데이터 |
|--------|----------|------|-------------|
| GET | `/api/search/keywords` | 인기/추천 검색어 | `search.json` |

---

## 디렉터리 구조

```
server/
├── docker-compose.yml          # MySQL + 앱 컨테이너 설정
├── Dockerfile                  # NestJS 앱 Docker 이미지
├── .env                        # 환경 변수
├── .env.example                # 환경 변수 예시
├── package.json
├── tsconfig.json
├── nest-cli.json
├── src/
│   ├── main.ts                 # 앱 진입점 (포트, CORS, Swagger)
│   ├── app.module.ts           # 루트 모듈
│   │
│   ├── config/
│   │   └── database.config.ts  # TypeORM 설정
│   │
│   ├── common/
│   │   ├── dto/                # 공통 DTO (페이지네이션 등)
│   │   └── interceptors/       # 응답 변환 인터셉터
│   │
│   ├── modules/
│   │   ├── products/
│   │   │   ├── products.module.ts
│   │   │   ├── products.controller.ts
│   │   │   ├── products.service.ts
│   │   │   ├── entities/
│   │   │   │   ├── product.entity.ts
│   │   │   │   ├── product-option.entity.ts
│   │   │   │   └── product-tag.entity.ts
│   │   │   └── dto/
│   │   │       └── get-products.dto.ts
│   │   │
│   │   ├── categories/
│   │   │   ├── categories.module.ts
│   │   │   ├── categories.controller.ts
│   │   │   ├── categories.service.ts
│   │   │   └── entities/
│   │   │       └── category.entity.ts
│   │   │
│   │   ├── banners/
│   │   │   ├── banners.module.ts
│   │   │   ├── banners.controller.ts
│   │   │   ├── banners.service.ts
│   │   │   └── entities/
│   │   │       └── banner.entity.ts
│   │   │
│   │   ├── reviews/
│   │   │   ├── reviews.module.ts
│   │   │   ├── reviews.controller.ts
│   │   │   ├── reviews.service.ts
│   │   │   └── entities/
│   │   │       ├── review.entity.ts
│   │   │       └── review-image.entity.ts
│   │   │
│   │   ├── users/
│   │   │   ├── users.module.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   └── entities/
│   │   │       └── user.entity.ts
│   │   │
│   │   ├── orders/
│   │   │   ├── orders.module.ts
│   │   │   ├── orders.controller.ts
│   │   │   ├── orders.service.ts
│   │   │   └── entities/
│   │   │       ├── order.entity.ts
│   │   │       └── order-item.entity.ts
│   │   │
│   │   ├── coupons/
│   │   │   ├── coupons.module.ts
│   │   │   ├── coupons.controller.ts
│   │   │   ├── coupons.service.ts
│   │   │   └── entities/
│   │   │       └── coupon.entity.ts
│   │   │
│   │   └── search/
│   │       ├── search.module.ts
│   │       ├── search.controller.ts
│   │       ├── search.service.ts
│   │       └── entities/
│   │           └── search-keyword.entity.ts
│   │
│   └── seeds/
│       ├── seed.module.ts
│       ├── seed.service.ts       # Mock JSON → DB 시딩 실행
│       └── seed.command.ts       # CLI 커맨드로 시딩 실행
└── test/
    └── ...
```

---

## 단계별 구현 계획

### Phase 1: 프로젝트 초기 설정

**목표:** NestJS 프로젝트 생성 및 Docker 환경 구축

1. `server/` 디렉터리에 NestJS 프로젝트 생성
2. 필수 패키지 설치
   - `@nestjs/typeorm`, `typeorm`, `mysql2`
   - `class-validator`, `class-transformer`
   - `@nestjs/swagger`
   - `@nestjs/config`
3. `docker-compose.yml` 작성 (MySQL 8.0 컨테이너)
4. `.env` / `.env.example` 환경 변수 설정
5. `database.config.ts` TypeORM 연결 설정
6. `app.module.ts`에 TypeORM, Config 모듈 등록
7. `main.ts`에 CORS, Swagger, ValidationPipe 설정
8. Docker Compose로 MySQL 기동 후 연결 확인

**완료 기준:** `npm run start:dev` 실행 시 NestJS 서버가 MySQL에 정상 연결

---

### Phase 2: Entity 정의 및 DB 테이블 생성

**목표:** 모든 테이블에 대한 Entity 클래스 작성

1. `category.entity.ts` — id, name, slug, icon
2. `product.entity.ts` — id, name, price, originalPrice, discountRate, image, rating, reviewCount, description + category 관계
3. `product-option.entity.ts` — id, name, price + product 관계
4. `product-tag.entity.ts` — id, tagName + product 관계
5. `banner.entity.ts` — id, image, title, link, sortOrder
6. `review.entity.ts` — id, productId, userName, rating, content, date + product 관계
7. `review-image.entity.ts` — id, imageUrl + review 관계
8. `user.entity.ts` — id, name, email, password, grade, point
9. `order.entity.ts` — id, date, status, totalPrice + user 관계
10. `order-item.entity.ts` — id, productId, productName, optionName, quantity, price, image + order 관계
11. `coupon.entity.ts` — id, name, discount, discountType, minOrderAmount, expiryDate + user 관계
12. `search-keyword.entity.ts` — id, keyword, type, sortOrder
13. TypeORM `synchronize: true`로 테이블 자동 생성 확인 (개발 환경 한정)

**완료 기준:** MySQL에 모든 테이블이 정상 생성됨

---

### Phase 3: Seed 데이터 마이그레이션

**목표:** 기존 Mock JSON 데이터를 DB에 시딩

1. `seed.service.ts` 작성
   - `client/public/data/` 내 JSON 파일들을 읽어 DB에 Insert
   - 시딩 순서: categories → products (+ options, tags) → banners → users → reviews (+ images) → orders (+ items) → coupons → search keywords
2. `seed.command.ts` 작성 — `npm run seed` 커맨드로 실행
3. 시딩 실행 후 데이터 정합성 검증

**완료 기준:** `npm run seed` 실행 시 모든 Mock 데이터가 DB에 정상 적재

---

### Phase 4: 상품 / 카테고리 API 구현

**목표:** 핵심 상품 조회 API 구현

1. **Categories 모듈**
   - `GET /api/categories` — 전체 카테고리 목록 반환
2. **Products 모듈**
   - `GET /api/products` — 전체 상품 목록 (options, tags 포함)
   - `GET /api/products?category=닭가슴살` — 카테고리 필터
   - `GET /api/products?sort=popular|price_asc|price_desc|discount` — 정렬
   - `GET /api/products/:id` — 상품 상세 (options, tags 포함)
3. DTO 작성 (`get-products.dto.ts`) — category, sort 쿼리 파라미터 유효성 검증

**완료 기준:** Swagger에서 상품/카테고리 API 호출 시 JSON 데이터 정상 반환

---

### Phase 5: 배너 / 리뷰 / 검색 API 구현

**목표:** 나머지 조회 API 구현

1. **Banners 모듈**
   - `GET /api/banners` — sortOrder 기준 정렬된 배너 목록
2. **Reviews 모듈**
   - `GET /api/reviews` — 전체 리뷰 목록 (images 포함)
   - `GET /api/reviews?productId=1` — 상품별 리뷰 필터
3. **Search 모듈**
   - `GET /api/search/keywords` — `{ popularKeywords: [...], recommendedKeywords: [...] }` 형태 반환

**완료 기준:** 모든 조회 API가 프론트엔드의 기존 JSON 응답 형태와 동일한 구조로 반환

---

### Phase 6: 사용자 / 주문 / 쿠폰 API 구현

**목표:** 마이페이지 관련 API 구현

1. **Users 모듈**
   - `GET /api/users/me` — 사용자 프로필 반환 (Mock: 고정 사용자)
2. **Orders 모듈**
   - `GET /api/orders` — 주문 내역 목록 (items 포함)
3. **Coupons 모듈**
   - `GET /api/coupons` — 쿠폰 목록

**완료 기준:** 마이페이지에서 필요한 모든 데이터를 API로 조회 가능

---

### Phase 7: 프론트엔드 연동

**목표:** 프론트엔드의 데이터 소스를 JSON → API로 전환

1. `client/lib/data.ts` 수정
   - `BASE_URL`을 NestJS 서버 주소로 변경 (예: `http://localhost:4000`)
   - fetch 경로를 `/data/*.json` → `/api/*` 엔드포인트로 변경
2. API 응답 형태가 기존 JSON 구조와 동일한지 검증
   - 차이가 있다면 백엔드 응답 또는 프론트엔드 타입을 조정
3. 전체 페이지 동작 테스트
   - 홈 (배너, 카테고리, 인기 상품)
   - 카테고리 (필터, 정렬)
   - 상품 상세 (옵션, 리뷰)
   - 장바구니 (클라이언트 Zustand — 변경 없음)
   - 마이페이지 (프로필, 주문내역, 쿠폰)
   - 검색 (인기/추천 검색어)

**완료 기준:** 모든 페이지가 NestJS API를 통해 정상 동작

---

## 환경 변수 (.env)

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=goldendak
DB_PASSWORD=goldendak
DB_DATABASE=golden_dak

# App
APP_PORT=4000
```

## Docker Compose 구성

```yaml
services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: golden_dak
      MYSQL_USER: goldendak
      MYSQL_PASSWORD: goldendak
    ports:
      - "3306:3306"
    volumes:
      - E:/docker/goldendak_mysql_data:/var/lib/mysql
```

---

## API 응답 형태 매핑

프론트엔드와의 호환성을 위해 API 응답은 기존 JSON 파일의 구조를 그대로 유지.

### 예시: GET /api/products/:id

```json
{
  "id": 1,
  "name": "스팀 닭가슴살 오리지널",
  "price": 12900,
  "originalPrice": 18900,
  "discountRate": 32,
  "image": "https://cdn.pixabay.com/...",
  "category": "닭가슴살",
  "rating": 4.8,
  "reviewCount": 4523,
  "tags": ["베스트", "무료배송"],
  "description": "부드럽고 촉촉한...",
  "options": [
    { "id": 1, "name": "100g x 10팩", "price": 12900 },
    { "id": 2, "name": "100g x 20팩", "price": 23800 }
  ]
}
```

> **주의:** DB에서는 `category`가 FK 관계이지만, API 응답에서는 프론트엔드 호환을 위해 `category: "닭가슴살"` (문자열)로 변환하여 반환.
> `tags`도 별도 테이블이지만 응답에서는 `["베스트", "무료배송"]` 배열로 변환.

---

## 참고 사항

- 장바구니(Cart)는 프론트엔드 Zustand + localStorage로 관리되므로 백엔드 API 불필요
- 인증/인가(Auth)는 현재 범위 밖 — 추후 JWT 기반 인증 추가 가능
- Phase 1~6은 백엔드 단독 개발, Phase 7에서 프론트엔드 연동
