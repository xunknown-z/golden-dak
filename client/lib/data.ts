import type { Product, Category, Banner, Review, UserProfile, Order, Coupon } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

async function fetchApi<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  return res.json();
}

export async function getProducts(): Promise<Product[]> {
  return fetchApi<Product[]>('/products');
}

export async function getProduct(id: number): Promise<Product | undefined> {
  try {
    return await fetchApi<Product>(`/products/${id}`);
  } catch {
    return undefined;
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  if (!category || category === 'all') return getProducts();
  return fetchApi<Product[]>(`/products?category=${encodeURIComponent(category)}`);
}

export async function getCategories(): Promise<Category[]> {
  return fetchApi<Category[]>('/categories');
}

export async function getBanners(): Promise<Banner[]> {
  return fetchApi<Banner[]>('/banners');
}

export async function getReviews(productId?: number): Promise<Review[]> {
  const path = productId ? `/reviews?productId=${productId}` : '/reviews';
  return fetchApi<Review[]>(path);
}

export async function getUser(): Promise<UserProfile> {
  return fetchApi<UserProfile>('/users/me');
}

export async function getOrders(): Promise<Order[]> {
  return fetchApi<Order[]>('/orders');
}

export async function getCoupons(): Promise<Coupon[]> {
  return fetchApi<Coupon[]>('/coupons');
}

export async function getSearchKeywords(): Promise<{
  popularKeywords: string[];
  recommendedKeywords: string[];
}> {
  return fetchApi('/search/keywords');
}
