import { ConsoleLogger } from '@nestjs/common';
import { WebSocketGateway, OnGatewayConnection } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { WsAuthService } from 'src/core/auth/ws/ws-auth.service';
import * as cookie from 'cookie';

@WebSocketGateway({
  namespace: 'authapi',
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class AuthGateway implements OnGatewayConnection {
  private logger = new ConsoleLogger({ json: true });

  constructor(private readonly service: WsAuthService) {}

  async handleConnection(client: Socket) {
    const accessToken = this.validate(client.handshake.headers.cookie);

    if (!accessToken) {
      client.disconnect();
    }

    try {
      await this.authorize(client, accessToken as string);
    } catch (error) {
      this.onError(client, error);
    }

    this.logger.log(`Client connected: ${client.id}`);
    this.logger.log(`Authorizing client with id: ${client.data.userId}`);
  }

  validate(rawCookies?: string): string | null {
    if (!rawCookies) {
      this.logger.error('cookies is missing');
      return null;
    }

    const cookies = cookie.parse(rawCookies);

    const accessToken = cookies['access-token'];

    if (!accessToken) {
      this.logger.error('access token is missing');
      return null;
    }

    return accessToken;
  }

  private async authorize(client: Socket, accessToken: string) {
    const userId = this.service.execute({ accessToken });

    client.data.userId = userId;

    await client.join(userId);
  }

  private onError(client: Socket, error: any) {
    this.logger.error('Authorization error:', error.message);
    client.disconnect();
  }
}
