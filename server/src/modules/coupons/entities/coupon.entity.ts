import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity.js';

@Entity('coupons')
export class Coupon {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column()
  discount!: number;

  @Column({ name: 'discount_type', length: 20 })
  discountType!: string; // 'percent' | 'amount'

  @Column({ name: 'min_order_amount' })
  minOrderAmount!: number;

  @Column({ name: 'expiry_date', type: 'date' })
  expiryDate!: string;

  @ManyToOne(() => User, (user) => user.coupons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ name: 'user_id' })
  userId!: number;
}
