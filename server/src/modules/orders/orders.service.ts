import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity.js';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async findAll(): Promise<Record<string, unknown>[]> {
    // Mock: 고정 사용자 (userId=1)의 주문만 조회
    const orders = await this.orderRepo.find({
      where: { userId: 1 },
      relations: ['items'],
      order: { date: 'DESC' },
    });

    return orders.map((o) => this.toResponse(o));
  }

  private toResponse(order: Order): Record<string, unknown> {
    return {
      id: order.id,
      date: order.date,
      status: order.status,
      items:
        order.items?.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          optionName: item.optionName,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })) ?? [],
      totalPrice: order.totalPrice,
    };
  }
}
