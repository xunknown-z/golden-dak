import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { ProductsService } from './products.service.js';
import { GetProductsDto } from './dto/get-products.dto.js';

@ApiTags('상품')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: '상품 목록 조회 (카테고리 필터, 정렬 지원)' })
  async findAll(@Query() query: GetProductsDto) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '상품 상세 조회' })
  @ApiParam({ name: 'id', description: '상품 ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }
}
