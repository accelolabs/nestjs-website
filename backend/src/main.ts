import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOrigin = process.env.CORS_ORIGIN || '*';
  const origin =
    corsOrigin === '*'
      ? true
      : corsOrigin
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean);

  app.enableCors({
    origin,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['content-type', 'authorization'],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
