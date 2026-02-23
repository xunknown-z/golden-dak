import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service.js';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
      Product,
      ProductOption,
      ProductTag,
      Banner,
      Review,
      ReviewImage,
      User,
      Order,
      OrderItem,
      Coupon,
      SearchKeyword,
    ]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
