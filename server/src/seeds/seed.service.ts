import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { Category } from '../modules/categories/entities/category.entity.js';
import { Product } from '../modules/products/entities/product.entity.js';
import { ProductOption } from '../modules/products/entities/product-option.entity.js';
import { ProductTag } from '../modules/products/entities/product-tag.entity.js';
import { Banner } from '../modules/banners/entities/banner.entity.js';
import { Review } from '../modules/reviews/entities/review.entity.js';
import { ReviewImage } from '../modules/reviews/entities/review-image.entity.js';
import { User } from '../modules/users/entities/user.entity.js';
import { Order } from '../modules/orders/entities/order.entity.js';
import { OrderItem } from '../modules/orders/entities/order-item.entity.js';
import { Coupon } from '../modules/coupons/entities/coupon.entity.js';
import { SearchKeyword } from '../modules/search/entities/search-keyword.entity.js';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(ProductOption)
    private readonly productOptionRepo: Repository<ProductOption>,
    @InjectRepository(ProductTag)
    private readonly productTagRepo: Repository<ProductTag>,
    @InjectRepository(Banner)
    private readonly bannerRepo: Repository<Banner>,
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
    @InjectRepository(ReviewImage)
    private readonly reviewImageRepo: Repository<ReviewImage>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Coupon)
    private readonly couponRepo: Repository<Coupon>,
    @InjectRepository(SearchKeyword)
    private readonly searchKeywordRepo: Repository<SearchKeyword>,
    private readonly dataSource: DataSource,
  ) {}

  private loadJson(filename: string): unknown {
    const dataDir = path.resolve(__dirname, '..', '..', '..', 'client', 'public', 'data');
    const filePath = path.join(dataDir, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  }

  async run(): Promise<void> {
    console.log('시딩을 시작합니다...');

    // 외래키 제약 조건 비활성화 후 테이블 초기화
    await this.dataSource.query('SET FOREIGN_KEY_CHECKS = 0');
    await this.reviewImageRepo.clear();
    await this.reviewRepo.clear();
    await this.productOptionRepo.clear();
    await this.productTagRepo.clear();
    await this.orderItemRepo.clear();
    await this.orderRepo.clear();
    await this.couponRepo.clear();
    await this.productRepo.clear();
    await this.categoryRepo.clear();
    await this.bannerRepo.clear();
    await this.userRepo.clear();
    await this.searchKeywordRepo.clear();
    await this.dataSource.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('기존 데이터 초기화 완료');

    // 1. Categories
    const categoriesData = this.loadJson('categories.json') as Array<{
      id: number;
      name: string;
      slug: string;
      icon: string;
    }>;
    for (const cat of categoriesData) {
      const category = this.categoryRepo.create({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon,
      });
      await this.categoryRepo.save(category);
    }
    console.log(`카테고리 ${categoriesData.length}개 시딩 완료`);

    // 2. Products (+ Options, Tags)
    const productsData = this.loadJson('products.json') as Array<{
      id: number;
      name: string;
      price: number;
      originalPrice: number;
      discountRate: number;
      image: string;
      category: string;
      rating: number;
      reviewCount: number;
      tags: string[];
      description: string;
      options: Array<{ id: number; name: string; price: number }>;
    }>;

    // 카테고리 이름 → ID 매핑
    const categoryMap = new Map<string, number>();
    for (const cat of categoriesData) {
      categoryMap.set(cat.name, cat.id);
    }

    for (const prod of productsData) {
      const categoryId = categoryMap.get(prod.category);
      if (!categoryId) {
        console.warn(`카테고리를 찾을 수 없습니다: ${prod.category}`);
        continue;
      }

      const product = this.productRepo.create({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        originalPrice: prod.originalPrice,
        discountRate: prod.discountRate,
        image: prod.image,
        rating: prod.rating,
        reviewCount: prod.reviewCount,
        description: prod.description,
        categoryId,
      });
      await this.productRepo.save(product);

      // Options
      for (const opt of prod.options) {
        const option = this.productOptionRepo.create({
          name: opt.name,
          price: opt.price,
          productId: prod.id,
        });
        await this.productOptionRepo.save(option);
      }

      // Tags
      for (const tagName of prod.tags) {
        const tag = this.productTagRepo.create({
          tagName,
          productId: prod.id,
        });
        await this.productTagRepo.save(tag);
      }
    }
    console.log(`상품 ${productsData.length}개 (옵션, 태그 포함) 시딩 완료`);

    // 3. Banners
    const bannersData = this.loadJson('banners.json') as Array<{
      id: number;
      image: string;
      title: string;
      link: string;
    }>;
    for (let i = 0; i < bannersData.length; i++) {
      const b = bannersData[i];
      const banner = this.bannerRepo.create({
        id: b.id,
        image: b.image,
        title: b.title,
        link: b.link,
        sortOrder: i + 1,
      });
      await this.bannerRepo.save(banner);
    }
    console.log(`배너 ${bannersData.length}개 시딩 완료`);

    // 4. Users
    const userData = this.loadJson('user.json') as {
      name: string;
      email: string;
      grade: string;
      point: number;
    };
    const user = this.userRepo.create({
      id: 1,
      name: userData.name,
      email: userData.email,
      password: 'hashed_password', // Mock 비밀번호
      grade: userData.grade,
      point: userData.point,
    });
    await this.userRepo.save(user);
    console.log('사용자 1명 시딩 완료');

    // 5. Reviews (+ Images)
    const reviewsData = this.loadJson('reviews.json') as Array<{
      id: number;
      productId: number;
      userName: string;
      rating: number;
      content: string;
      date: string;
      images: string[];
    }>;
    for (const rev of reviewsData) {
      const review = this.reviewRepo.create({
        id: rev.id,
        productId: rev.productId,
        userName: rev.userName,
        rating: rev.rating,
        content: rev.content,
        date: rev.date,
      });
      await this.reviewRepo.save(review);

      for (const imgUrl of rev.images) {
        const reviewImage = this.reviewImageRepo.create({
          imageUrl: imgUrl,
          reviewId: rev.id,
        });
        await this.reviewImageRepo.save(reviewImage);
      }
    }
    console.log(`리뷰 ${reviewsData.length}개 (이미지 포함) 시딩 완료`);

    // 6. Orders (+ Items)
    const ordersData = this.loadJson('orders.json') as Array<{
      id: string;
      date: string;
      status: string;
      items: Array<{
        productId: number;
        productName: string;
        optionName: string;
        quantity: number;
        price: number;
        image: string;
      }>;
      totalPrice: number;
    }>;
    for (const ord of ordersData) {
      const order = this.orderRepo.create({
        id: ord.id,
        date: ord.date,
        status: ord.status,
        totalPrice: ord.totalPrice,
        userId: 1, // 모든 주문은 Mock 사용자에게 귀속
      });
      await this.orderRepo.save(order);

      for (const item of ord.items) {
        const orderItem = this.orderItemRepo.create({
          productId: item.productId,
          productName: item.productName,
          optionName: item.optionName,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
          orderId: ord.id,
        });
        await this.orderItemRepo.save(orderItem);
      }
    }
    console.log(`주문 ${ordersData.length}개 (주문항목 포함) 시딩 완료`);

    // 7. Coupons
    const couponsData = this.loadJson('coupons.json') as Array<{
      id: number;
      name: string;
      discount: number;
      discountType: string;
      minOrderAmount: number;
      expiryDate: string;
    }>;
    for (const c of couponsData) {
      const coupon = this.couponRepo.create({
        id: c.id,
        name: c.name,
        discount: c.discount,
        discountType: c.discountType,
        minOrderAmount: c.minOrderAmount,
        expiryDate: c.expiryDate,
        userId: 1, // 모든 쿠폰은 Mock 사용자에게 귀속
      });
      await this.couponRepo.save(coupon);
    }
    console.log(`쿠폰 ${couponsData.length}개 시딩 완료`);

    // 8. Search Keywords
    const searchData = this.loadJson('search.json') as {
      popularKeywords: string[];
      recommendedKeywords: string[];
    };
    let sortOrder = 1;
    for (const keyword of searchData.popularKeywords) {
      const sk = this.searchKeywordRepo.create({
        keyword,
        type: 'popular',
        sortOrder: sortOrder++,
      });
      await this.searchKeywordRepo.save(sk);
    }
    sortOrder = 1;
    for (const keyword of searchData.recommendedKeywords) {
      const sk = this.searchKeywordRepo.create({
        keyword,
        type: 'recommended',
        sortOrder: sortOrder++,
      });
      await this.searchKeywordRepo.save(sk);
    }
    console.log(`검색 키워드 ${searchData.popularKeywords.length + searchData.recommendedKeywords.length}개 시딩 완료`);

    console.log('모든 시딩이 완료되었습니다!');
  }
}
