import ProductCardSkeleton from '@/components/skeleton/ProductCardSkeleton';

export default function CategoryLoading() {
  return (
    <div className="animate-pulse">
      {/* 카테고리 탭 스켈레톤 */}
      <div className="flex gap-1 px-4 py-3 border-b border-border">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 w-16 bg-gray-200 rounded-full shrink-0" />
        ))}
      </div>

      {/* 정렬 필터 스켈레톤 */}
      <div className="flex gap-2 px-4 py-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-8 w-20 bg-gray-200 rounded-full shrink-0" />
        ))}
      </div>

      {/* 상품 리스트 스켈레톤 */}
      <div className="grid grid-cols-2 gap-2 px-4 pb-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
