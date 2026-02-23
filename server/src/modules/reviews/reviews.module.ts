import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity.js';
import { ReviewImage } from './entities/review-image.entity.js';
import { ReviewsController } from './reviews.controller.js';
import { ReviewsService } from './reviews.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Review, ReviewImage])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
