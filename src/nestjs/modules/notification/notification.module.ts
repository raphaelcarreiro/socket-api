import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { AuthModule } from '../auth/auth.module';
import { NotificationController } from './notification.controller';

@Module({
  imports: [AuthModule],
  providers: [NotificationGateway],
  controllers: [NotificationController],
})
export class NotificationModule {}
