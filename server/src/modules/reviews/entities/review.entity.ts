import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity.js';
import { ReviewImage } from './review-image.entity.js';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'user_name', length: 50 })
  userName!: string;

  @Column()
  rating!: number;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'date' })
  date!: string;

  @ManyToOne(() => Product, (product) => product.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @Column({ name: 'product_id' })
  productId!: number;

  @OneToMany(() => ReviewImage, (image) => image.review, { cascade: true })
  images!: ReviewImage[];
}
