import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BannersService } from './banners.service.js';
import { Banner } from './entities/banner.entity.js';

@ApiTags('배너')
@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Get()
  @ApiOperation({ summary: '배너 목록 조회' })
  async findAll(): Promise<Banner[]> {
    return this.bannersService.findAll();
  }
}
