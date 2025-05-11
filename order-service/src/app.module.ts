import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './apps/notification/notification.module';
import { MicroserviceExceptionFilter } from './core/exceptions/RpcExceptionFilter';
import { DatabaseModule } from './modules/database/database.module';
import { OrderModule } from './modules/orders/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
      cache: true,
      load: [],
      envFilePath: `${process.env.NODE_ENV}.env`, // loading NODE_ENV from package.json scripts
    }),
    NotificationModule,
    DatabaseModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: MicroserviceExceptionFilter },
  ],
})
export class AppModule {}
