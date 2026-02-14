import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity.js';
import { ProductOption } from './product-option.entity.js';
import { ProductTag } from './product-tag.entity.js';
import { Review } from '../../reviews/entities/review.entity.js';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 200 })
  name!: string;

  @Column()
  price!: number;

  @Column({ name: 'original_price' })
  originalPrice!: number;

  @Column({ name: 'discount_rate' })
  discountRate!: number;

  @Column({ length: 500 })
  image!: string;

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
  rating!: number;

  @Column({ name: 'review_count', default: 0 })
  reviewCount!: number;

  @Column({ type: 'text' })
  description!: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category!: Category;

  @Column({ name: 'category_id' })
  categoryId!: number;

  @OneToMany(() => ProductOption, (option) => option.product, { cascade: true })
  options!: ProductOption[];

  @OneToMany(() => ProductTag, (tag) => tag.product, { cascade: true })
  tags!: ProductTag[];

  @OneToMany(() => Review, (review) => review.product)
  reviews!: Review[];
}
