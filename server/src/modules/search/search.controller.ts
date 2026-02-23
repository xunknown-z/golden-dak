import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SearchService } from './search.service.js';

@ApiTags('검색')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('keywords')
  @ApiOperation({ summary: '인기/추천 검색어 조회' })
  async getKeywords() {
    return this.searchService.getKeywords();
  }
}
