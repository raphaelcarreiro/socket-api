import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ClassValidatorError } from './core/shared/errors/class-validator.error';
import * as cookieParser from 'cookie-parser';

export function applyGlobalResources(app: INestApplication) {
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: errors => new ClassValidatorError(errors, 'consumer data validation has failed'),
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );
}
