import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config/database.config.js';
import { CategoriesModule } from './modules/categories/categories.module.js';
import { ProductsModule } from './modules/products/products.module.js';
import { BannersModule } from './modules/banners/banners.module.js';
import { ReviewsModule } from './modules/reviews/reviews.module.js';
import { SearchModule } from './modules/search/search.module.js';
import { UsersModule } from './modules/users/users.module.js';
import { OrdersModule } from './modules/orders/orders.module.js';
import { CouponsModule } from './modules/coupons/coupons.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),
    CategoriesModule,
    ProductsModule,
    BannersModule,
    ReviewsModule,
    SearchModule,
    UsersModule,
    OrdersModule,
    CouponsModule,
  ],
})
export class AppModule {}
