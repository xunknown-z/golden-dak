import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service.js';

@ApiTags('리뷰')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  @ApiOperation({ summary: '리뷰 목록 조회 (상품별 필터 지원)' })
  @ApiQuery({ name: 'productId', required: false, description: '상품 ID' })
  async findAll(@Query('productId') productId?: string) {
    const pid = productId ? parseInt(productId, 10) : undefined;
    return this.reviewsService.findAll(pid);
  }
}
