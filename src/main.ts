import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { applyGlobalResources } from './global-resources';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger(),
  });

  applyGlobalResources(app);

  await app.listen(process.env.PORT ?? 3002);
}

bootstrap();
