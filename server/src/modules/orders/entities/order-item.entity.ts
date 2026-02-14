import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity.js';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'product_id' })
  productId!: number;

  @Column({ name: 'product_name', length: 200 })
  productName!: string;

  @Column({ name: 'option_name', length: 100 })
  optionName!: string;

  @Column()
  quantity!: number;

  @Column()
  price!: number;

  @Column({ length: 500 })
  image!: string;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order!: Order;

  @Column({ name: 'order_id', length: 50 })
  orderId!: string;
}
