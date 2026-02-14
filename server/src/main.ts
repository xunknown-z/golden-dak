import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // 글로벌 프리픽스
  app.setGlobalPrefix('api');

  // CORS
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  // ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Golden-Dak API')
    .setDescription('골든닭 커머스 플랫폼 API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get<number>('APP_PORT') ?? 4000;
  await app.listen(port);
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다`);
  console.log(`Swagger: http://localhost:${port}/api/docs`);
}
bootstrap();
