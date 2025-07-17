export abstract class BaseError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);

    this.name = 'BaseError';
    this.statusCode = statusCode;
  }

  abstract toJSON(): any;
}
