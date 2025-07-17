import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { applyGlobalResources } from './global-resources';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  applyGlobalResources(app);

  await app.listen(process.env.PORT ?? 3050);
}

bootstrap();
