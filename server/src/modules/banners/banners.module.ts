import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from './entities/banner.entity.js';
import { BannersController } from './banners.controller.js';
import { BannersService } from './banners.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Banner])],
  controllers: [BannersController],
  providers: [BannersService],
})
export class BannersModule {}
