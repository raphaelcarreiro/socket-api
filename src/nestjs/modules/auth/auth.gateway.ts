import { WebSocketGateway, OnGatewayConnection } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { WsAuthService } from 'src/core/auth/ws/ws-auth.service';

@WebSocketGateway({
  namespace: 'authapi',
})
export class AuthGateway implements OnGatewayConnection {
  constructor(private readonly service: WsAuthService) {}

  async handleConnection(client: Socket) {
    const accessToken = this.validate(client.handshake.headers.authorization);

    if (!accessToken) {
      client.disconnect();
    }

    try {
      await this.authorize(client, accessToken as string);
    } catch (error) {
      this.onError(client, error);
    }

    console.log(`Client connected: ${client.id}`);
    console.log(`Authorizing client with id: ${client.data.userId}`);
  }

  validate(authorization?: string): string | null {
    if (!authorization) {
      console.error('Authorization header is missing');
      return null;
    }

    const accessToken = authorization?.replace('Bearer ', '');

    if (!accessToken) {
      console.error('access token is missing');
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
    console.error('Authorization error:', error.message);
    client.disconnect();
  }
}
