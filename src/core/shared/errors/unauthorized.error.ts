import { HttpError } from './http.error';

export class UnauthorizedError extends HttpError {
  constructor(message = 'unauthorized', statusCode = 401) {
    super(message, 'unauthorized', statusCode);
    this.name = 'UnauthorizedError';
  }
}
