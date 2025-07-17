import { Module } from '@nestjs/common';
import { NotificationModule } from './nestjs/modules/notification/notification.module';
import { SharedModule } from './nestjs/modules/shared/shared.module';
import { HealthModule } from './nestjs/modules/health/health.module';

@Module({
  imports: [NotificationModule, SharedModule, HealthModule],
})
export class AppModule {}
