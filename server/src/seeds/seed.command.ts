import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from '../config/database.config.js';
import { SeedModule } from './seed.module.js';
import { SeedService } from './seed.service.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),
    SeedModule,
  ],
})
class SeedAppModule {}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedAppModule);

  try {
    const seedService = app.get(SeedService);
    await seedService.run();
  } catch (error) {
    console.error('시딩 중 오류 발생:', error);
    process.exitCode = 1;
  } finally {
    await app.close();
  }
}

bootstrap();
