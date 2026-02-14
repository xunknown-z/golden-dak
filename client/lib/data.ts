import type { Product, Category, Banner, Review } from '@/types';

const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}/data/${path}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  return res.json();
}

export async function getProducts(): Promise<Product[]> {
  return fetchJson<Product[]>('products.json');
}

export async function getProduct(id: number): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.id === id);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getProducts();
  if (!category || category === 'all') return products;
  return products.filter((p) => p.category === category);
}

export async function getCategories(): Promise<Category[]> {
  return fetchJson<Category[]>('categories.json');
}

export async function getBanners(): Promise<Banner[]> {
  return fetchJson<Banner[]>('banners.json');
}

export async function getReviews(productId?: number): Promise<Review[]> {
  const reviews = await fetchJson<Review[]>('reviews.json');
  if (productId) return reviews.filter((r) => r.productId === productId);
  return reviews;
}
