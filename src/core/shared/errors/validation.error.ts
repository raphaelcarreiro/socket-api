import { ValidatorError } from '../validator/validator';
import { BaseError } from './base.error';

export class ValidationError extends BaseError {
  constructor(
    message: string,
    public errors?: ValidatorError[],
    public statusCode = 422,
  ) {
    super(message, statusCode);
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      errors: this.errors,
    };
  }
}
