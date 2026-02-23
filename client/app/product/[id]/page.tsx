'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import type { Product, Review } from '@/types';
import ProductImageSlider from '@/components/detail/ProductImageSlider';
import ProductInfo from '@/components/detail/ProductInfo';
import DetailTabs from '@/components/detail/DetailTabs';
import AddToCartBar from '@/components/detail/AddToCartBar';
import { getProduct, getReviews } from '@/lib/data';

export default function ProductDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    getProduct(id).then((found) => {
      if (found) setProduct(found);
    });
    getReviews(id).then(setReviews);
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-text-muted">
        로딩 중...
      </div>
    );
  }

  const productImages = [product.image, product.image, product.image];

  return (
    <div className="pb-20">
      <ProductImageSlider images={productImages} productName={product.name} />
      <ProductInfo product={product} />
      <DetailTabs description={product.description} reviews={reviews} />
      <AddToCartBar product={product} />
    </div>
  );
}
