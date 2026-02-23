import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';
import { Coupon } from '../coupons/entities/coupon.entity.js';

export interface UserProfileResponse {
  name: string;
  email: string;
  grade: string;
  point: number;
  couponCount: number;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Coupon)
    private readonly couponRepo: Repository<Coupon>,
  ) {}

  async getMe(): Promise<UserProfileResponse> {
    // Mock: 고정 사용자 (id=1)
    const user = await this.userRepo.findOne({ where: { id: 1 } });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다');
    }

    const couponCount = await this.couponRepo.count({
      where: { userId: user.id },
    });

    return {
      name: user.name,
      email: user.email,
      grade: user.grade,
      point: user.point,
      couponCount,
    };
  }
}
