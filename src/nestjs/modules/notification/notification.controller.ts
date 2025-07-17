import { Body, Controller, Post } from '@nestjs/common';
import { NotificationDto } from './notification.dto';
import { NotificationGateway } from './notification.gateway';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly gateway: NotificationGateway) {}

  @Post()
  handle(@Body() body: NotificationDto) {
    this.gateway.handle(body);

    return {
      message: 'OK',
    };
  }
}
