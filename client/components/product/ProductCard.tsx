'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import type { Product } from '@/types';
import { formatPrice, formatRating } from '@/lib/format';
import { useCartStore } from '@/stores/cartStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultOption = product.options[0];
    if (!defaultOption) return;
    addItem(product, defaultOption, 1);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };

  return (
    <Link
      href={`/product/${product.id}`}
      className="block bg-surface rounded-lg overflow-hidden"
      aria-label={`${product.name} - ${formatPrice(product.price)}원`}
    >
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 480px) 50vw, 240px"
          unoptimized
        />
        {product.discountRate > 0 && (
          <span className="absolute top-2 left-2 bg-badge-red text-white text-xs font-bold px-2 py-0.5 rounded">
            {product.discountRate}%
          </span>
        )}
        {product.tags.includes('베스트') && (
          <span className="absolute top-2 right-2 bg-badge-orange text-white text-xs font-bold px-2 py-0.5 rounded">
            BEST
          </span>
        )}
        <button
          type="button"
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 w-8 h-8 flex items-center justify-center bg-white/90 rounded-lg shadow-sm hover:bg-white transition-colors"
          aria-label={`${product.name} 장바구니 담기`}
        >
          <ShoppingCartIcon className="w-5 h-5 text-text-secondary" />
        </button>
        {showToast && (
          <span className="absolute bottom-2 left-2 bg-black/75 text-white text-[11px] px-2 py-1 rounded">
            담았습니다!
          </span>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-sm font-medium text-text-primary line-clamp-2 leading-tight mb-1">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-1.5 mb-1">
          {product.discountRate > 0 && (
            <span className="text-sm font-bold text-primary">{product.discountRate}%</span>
          )}
          <span className="text-base font-bold text-text-primary">
            {formatPrice(product.price)}원
          </span>
        </div>

        {product.discountRate > 0 && (
          <p className="text-xs text-text-muted line-through mb-1.5">
            {formatPrice(product.originalPrice)}원
          </p>
        )}

        <div className="flex items-center gap-1 text-xs text-text-secondary">
          <StarIcon className="w-3.5 h-3.5 text-star" />
          <span>{formatRating(product.rating)}</span>
          <span className="text-text-muted">({product.reviewCount.toLocaleString()})</span>
        </div>

        {product.tags.includes('무료배송') && (
          <span className="inline-block mt-1.5 text-[11px] text-text-secondary border border-border rounded px-1.5 py-0.5">
            무료배송
          </span>
        )}
      </div>
    </Link>
  );
}
