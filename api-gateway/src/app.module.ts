import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './apps/cache/redis.module';
import { NotificationModule } from './apps/notification/notification.module';
import { HttpExceptionFilter } from './core/exceptions/http.exception';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { TokenModule } from './modules/tokens/token.module';
import { OrderModule } from './apps/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
      cache: true,
      load: [],
      envFilePath: `${process.env.NODE_ENV}.env`, // loading NODE_ENV from package.json scripts
    }),
    RedisModule,
    DatabaseModule,
    AuthModule,
    TokenModule,
    OrderModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
