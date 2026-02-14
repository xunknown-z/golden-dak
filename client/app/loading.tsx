import ProductCardSkeleton from '@/components/skeleton/ProductCardSkeleton';

export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* 배너 스켈레톤 */}
      <div className="w-full aspect-[2/1] bg-gray-200" />

      {/* 카테고리 그리드 스켈레톤 */}
      <div className="px-4 py-5">
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 py-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
              <div className="h-3 bg-gray-200 rounded w-12" />
            </div>
          ))}
        </div>
      </div>

      {/* 인기 상품 스켈레톤 */}
      <div className="px-4 py-5">
        <div className="h-6 bg-gray-200 rounded w-24 mb-3" />
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
