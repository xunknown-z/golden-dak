import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from './entities/coupon.entity.js';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepo: Repository<Coupon>,
  ) {}

  async findAll(): Promise<Record<string, unknown>[]> {
    // Mock: 고정 사용자 (userId=1)의 쿠폰만 조회
    const coupons = await this.couponRepo.find({
      where: { userId: 1 },
      order: { expiryDate: 'ASC' },
    });

    return coupons.map((c) => ({
      id: c.id,
      name: c.name,
      discount: c.discount,
      discountType: c.discountType,
      minOrderAmount: c.minOrderAmount,
      expiryDate: c.expiryDate,
    }));
  }
}
