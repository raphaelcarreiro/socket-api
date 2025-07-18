import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Request } from 'express';
import { HttpAuthService } from 'src/core/auth/http/http-auth.service';
import { UnauthorizedError } from 'src/core/shared/errors/unauthorized.error';

export class AuthGuard implements CanActivate {
  constructor(@Inject(HttpAuthService) private readonly service: HttpAuthService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    return this.authorize(request);
  }

  private authorize(request: Request) {
    const accessToken = this.extractAccessToken(request);

    this.service.execute({ accessToken });

    return true;
  }

  private extractAccessToken(request: Request): string {
    const accessToken = request.cookies['access-token'];

    if (!accessToken) {
      throw new UnauthorizedError();
    }

    return accessToken;
  }
}
