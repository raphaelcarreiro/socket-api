import { WebSocketGateway, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { NotificationDto } from './notification.dto';
import { Namespace } from 'socket.io';
import { NAMESPACES } from 'src/core/shared/constants/namespaces';

@WebSocketGateway({
  namespace: NAMESPACES.AUTHAPI,
})
export class NotificationGateway {
  @WebSocketServer()
  private namespace: Namespace;

  handle(@MessageBody() notification: NotificationDto) {
    this.namespace.to(notification.userId).emit('notification.created', notification.content);

    return notification;
  }
}
