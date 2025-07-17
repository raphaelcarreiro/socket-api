import { BaseError } from './base.error';

export class HttpError extends BaseError {
  constructor(
    public message: string,
    public code: string,
    public statusCode: number,
  ) {
    super(message, statusCode);
    this.name = 'HttpError';
  }

  public toJSON() {
    return {
      code: this.code,
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}
