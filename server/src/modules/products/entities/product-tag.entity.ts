import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity.js';

@Entity('product_tags')
export class ProductTag {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'tag_name', length: 50 })
  tagName!: string;

  @ManyToOne(() => Product, (product) => product.tags, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @Column({ name: 'product_id' })
  productId!: number;
}
