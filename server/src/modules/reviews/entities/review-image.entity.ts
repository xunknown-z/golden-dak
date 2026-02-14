import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Review } from './review.entity.js';

@Entity('review_images')
export class ReviewImage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'image_url', length: 500 })
  imageUrl!: string;

  @ManyToOne(() => Review, (review) => review.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'review_id' })
  review!: Review;

  @Column({ name: 'review_id' })
  reviewId!: number;
}
