import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchKeyword } from './entities/search-keyword.entity.js';

export interface SearchKeywordsResponse {
  popularKeywords: string[];
  recommendedKeywords: string[];
}

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(SearchKeyword)
    private readonly searchKeywordRepo: Repository<SearchKeyword>,
  ) {}

  async getKeywords(): Promise<SearchKeywordsResponse> {
    const keywords = await this.searchKeywordRepo.find({
      order: { sortOrder: 'ASC' },
    });

    return {
      popularKeywords: keywords
        .filter((k) => k.type === 'popular')
        .map((k) => k.keyword),
      recommendedKeywords: keywords
        .filter((k) => k.type === 'recommended')
        .map((k) => k.keyword),
    };
  }
}
