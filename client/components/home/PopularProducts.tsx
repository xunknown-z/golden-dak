'use client';

import { useRef, useCallback, type MouseEvent } from 'react';
import type { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';

interface PopularProductsProps {
  products: Product[];
}

export default function PopularProducts({ products }: PopularProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasMoved = useRef(false);

  const onMouseDown = useCallback((e: MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
    el.style.cursor = 'grabbing';
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    if (Math.abs(x - startX.current) > 3) hasMoved.current = true;
    el.scrollLeft = scrollLeft.current - (x - startX.current);
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    const el = scrollRef.current;
    if (el) el.style.cursor = 'grab';
  }, []);

  const onClickCapture = useCallback((e: MouseEvent) => {
    if (hasMoved.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  return (
    <section className="py-5" aria-label="인기 상품">
      <h2 className="text-lg font-bold text-text-primary mb-3 px-4">인기 상품</h2>
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide px-4 cursor-grab select-none"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onDragStart={(e) => e.preventDefault()}
        onClickCapture={onClickCapture}
      >
        {products.map((product) => (
          <div key={product.id} className="shrink-0 w-40">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
