import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity.js';
import { GetProductsDto } from './dto/get-products.dto.js';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async findAll(query: GetProductsDto): Promise<Record<string, unknown>[]> {
    const qb = this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.options', 'options')
      .leftJoinAndSelect('product.tags', 'tags')
      .leftJoinAndSelect('product.category', 'category');

    // 카테고리 필터
    if (query.category && query.category !== 'all') {
      qb.andWhere('category.name = :categoryName', {
        categoryName: query.category,
      });
    }

    // 정렬
    switch (query.sort) {
      case 'price_asc':
        qb.orderBy('product.price', 'ASC');
        break;
      case 'price_desc':
        qb.orderBy('product.price', 'DESC');
        break;
      case 'discount':
        qb.orderBy('product.discountRate', 'DESC');
        break;
      case 'popular':
      default:
        qb.orderBy('product.reviewCount', 'DESC');
        break;
    }

    const products = await qb.getMany();
    return products.map((p) => this.toResponse(p));
  }

  async findOne(id: number): Promise<Record<string, unknown>> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['options', 'tags', 'category'],
    });

    if (!product) {
      throw new NotFoundException(`상품 ID ${id}을(를) 찾을 수 없습니다`);
    }

    return this.toResponse(product);
  }

  private toResponse(product: Product): Record<string, unknown> {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      discountRate: product.discountRate,
      image: product.image,
      category: product.category?.name ?? '',
      rating: Number(product.rating),
      reviewCount: product.reviewCount,
      tags: product.tags?.map((t) => t.tagName) ?? [],
      description: product.description,
      options:
        product.options?.map((o) => ({
          id: o.id,
          name: o.name,
          price: o.price,
        })) ?? [],
    };
  }
}
