import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity.js';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
  ) {}

  async findAll(productId?: number): Promise<Record<string, unknown>[]> {
    const where = productId ? { productId } : {};
    const reviews = await this.reviewRepo.find({
      where,
      relations: ['images'],
      order: { date: 'DESC', id: 'DESC' },
    });

    return reviews.map((r) => this.toResponse(r));
  }

  private toResponse(review: Review): Record<string, unknown> {
    return {
      id: review.id,
      productId: review.productId,
      userName: review.userName,
      rating: review.rating,
      content: review.content,
      date: review.date,
      images: review.images?.map((img) => img.imageUrl) ?? [],
    };
  }
}
