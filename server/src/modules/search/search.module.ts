import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchKeyword } from './entities/search-keyword.entity.js';
import { SearchController } from './search.controller.js';
import { SearchService } from './search.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([SearchKeyword])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
