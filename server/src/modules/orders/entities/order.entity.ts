import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity.js';
import { OrderItem } from './order-item.entity.js';

@Entity('orders')
export class Order {
  @PrimaryColumn({ length: 50 })
  id!: string; // 'ORD-2024-001' 형식

  @Column({ type: 'date' })
  date!: string;

  @Column({ length: 20 })
  status!: string;

  @Column({ name: 'total_price' })
  totalPrice!: number;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ name: 'user_id' })
  userId!: number;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items!: OrderItem[];
}
