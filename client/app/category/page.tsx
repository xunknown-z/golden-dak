'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Product, Category } from '@/types';
import ProductList from '@/components/product/ProductList';
import CategoryTabs from '@/components/product/CategoryTabs';
import SortFilter from '@/components/product/SortFilter';
import { useSearchParams } from 'next/navigation';
import { getProducts, getCategories } from '@/lib/data';

const categorySlugToName: Record<string, string> = {
  breast: '닭가슴살',
  sausage: '소시지',
  steak: '스테이크',
  ball: '볼/큐브',
  snack: '간식/음료',
  lunchbox: '도시락',
};

function sortProducts(products: Product[], sort: string): Product[] {
  const sorted = [...products];
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'discount':
      return sorted.sort((a, b) => b.discountRate - a.discountRate);
    case 'popular':
    default:
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
  }
}

export default function CategoryPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'all';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [currentSort, setCurrentSort] = useState('popular');

  useEffect(() => {
    getProducts().then(setProducts);
    getCategories().then(setCategories);
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (activeCategory !== 'all') {
      const categoryName = categorySlugToName[activeCategory];
      if (categoryName) {
        filtered = products.filter((p) => p.category === categoryName);
      }
    }
    return sortProducts(filtered, currentSort);
  }, [products, activeCategory, currentSort]);

  return (
    <>
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <SortFilter currentSort={currentSort} onSortChange={setCurrentSort} />
      <div className="pb-4">
        <ProductList products={filteredProducts} />
      </div>
    </>
  );
}
