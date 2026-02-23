import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { Coupon } from '../coupons/entities/coupon.entity.js';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([User, Coupon])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
