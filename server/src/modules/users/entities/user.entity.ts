import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../../orders/entities/order.entity.js';
import { Coupon } from '../../coupons/entities/coupon.entity.js';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  name!: string;

  @Column({ length: 100, unique: true })
  email!: string;

  @Column({ length: 255 })
  password!: string;

  @Column({ length: 20, default: '실버' })
  grade!: string;

  @Column({ default: 0 })
  point!: number;

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  @OneToMany(() => Coupon, (coupon) => coupon.user)
  coupons!: Coupon[];
}
