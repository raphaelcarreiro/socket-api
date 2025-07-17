import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { BaseError } from 'src/core/shared/errors/base.error';

@Catch(BaseError)
export class ErrorFilter implements ExceptionFilter {
  catch(error: BaseError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    response.status(error.statusCode).json(error.toJSON());
  }
}
