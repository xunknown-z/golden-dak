'use client';

import { useRef, useCallback, type MouseEvent } from 'react';
import type { Category } from '@/types';

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
}

export default function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  const allTab = { slug: 'all', name: '전체' };
  const tabs = [allTab, ...categories.map((c) => ({ slug: c.slug, name: c.name }))];

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
    const walk = x - startX.current;
    if (Math.abs(walk) > 3) hasMoved.current = true;
    el.scrollLeft = scrollLeft.current - walk;
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    const el = scrollRef.current;
    if (el) el.style.cursor = 'grab';
  }, []);

  const handleTabClick = (slug: string) => {
    if (hasMoved.current) return;
    onCategoryChange(slug);
  };

  return (
    <div
      ref={scrollRef}
      className="flex items-center gap-1 px-4 py-3 overflow-x-auto scrollbar-hide border-b border-border cursor-grab select-none"
      role="tablist"
      aria-label="카테고리 필터"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onDragStart={(e) => e.preventDefault()}
    >
      {tabs.map(({ slug, name }) => (
        <button
          key={slug}
          type="button"
          onClick={() => handleTabClick(slug)}
          className={`shrink-0 px-4 py-2 text-sm rounded-full transition-colors ${
            activeCategory === slug
              ? 'bg-text-primary text-white font-semibold'
              : 'text-text-secondary hover:bg-gray-100'
          }`}
          role="tab"
          aria-selected={activeCategory === slug}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
