import { IsOptional, IsString, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetProductsDto {
  @ApiPropertyOptional({ description: '카테고리 이름 (예: 닭가슴살)' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    description: '정렬 기준',
    enum: ['popular', 'price_asc', 'price_desc', 'discount'],
  })
  @IsOptional()
  @IsIn(['popular', 'price_asc', 'price_desc', 'discount'])
  sort?: string;
}
