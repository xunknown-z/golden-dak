'use client';

import Link from 'next/link';
import type { Category } from '@/types';

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="px-4 py-5" aria-label="카테고리 바로가기">
      <div className="grid grid-cols-4 gap-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category?cat=${category.slug}`}
            className="flex flex-col items-center gap-1.5 py-3 rounded-xl hover:bg-gray-50 transition-colors"
            aria-label={category.name}
          >
            <span className="text-2xl" role="img" aria-hidden="true">
              {category.icon}
            </span>
            <span className="text-xs font-medium text-text-primary">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
