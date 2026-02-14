import BannerSlider from '@/components/home/BannerSlider';
import CategoryGrid from '@/components/home/CategoryGrid';
import PopularProducts from '@/components/home/PopularProducts';
import { getProducts, getCategories, getBanners } from '@/lib/data';

export default async function HomePage() {
  const [products, categories, banners] = await Promise.all([
    getProducts(),
    getCategories(),
    getBanners(),
  ]);

  const popularProducts = products
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 6);

  return (
    <>
      <BannerSlider banners={banners} />
      <CategoryGrid categories={categories} />
      <PopularProducts products={popularProducts} />
    </>
  );
}
