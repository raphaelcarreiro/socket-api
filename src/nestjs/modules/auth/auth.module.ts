import { Module } from '@nestjs/common';
import { AuthGateway } from './auth.gateway';
import { WsAuthService } from 'src/core/auth/ws/ws-auth.service';
import { HttpAuthService } from 'src/core/auth/http/http-auth.service';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './notification.guard';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    AuthGateway,
    WsAuthService,
    HttpAuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
