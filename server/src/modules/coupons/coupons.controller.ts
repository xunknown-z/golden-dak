import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CouponsService } from './coupons.service.js';

@ApiTags('쿠폰')
@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Get()
  @ApiOperation({ summary: '내 쿠폰 목록 조회' })
  async findAll() {
    return this.couponsService.findAll();
  }
}
