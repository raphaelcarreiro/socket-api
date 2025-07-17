import { UnauthorizedError } from '../../shared/errors/unauthorized.error';
import { JwtPayload, verify } from 'jsonwebtoken';
import { AuthDto } from './auth.dto';

export class HttpAuthService {
  execute(input: AuthDto): string {
    const payload = verify(input.accessToken, `${process.env.JWT_SECRET}`) as JwtPayload;

    if (!payload.sub) {
      throw new UnauthorizedError();
    }

    return payload.sub;
  }
}
