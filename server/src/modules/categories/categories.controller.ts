import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CategoriesService } from './categories.service.js';
import { Category } from './entities/category.entity.js';

@ApiTags('카테고리')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: '전체 카테고리 목록 조회' })
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }
}
