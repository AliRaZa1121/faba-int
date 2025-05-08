import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServiceAController } from './service-a.controller';
import { ServiceAService } from './service-a.service';
import { MICROSERVICES } from 'src/utilities/constant/microservice-constant';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: MICROSERVICES.SERVICE_B,
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            host: configService.get<string>('REDIS.HOST'),
            port: configService.get<number>('REDIS.PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ServiceAController],
  providers: [ServiceAService],
  exports: [ServiceAService],
})
export class ServiceAModule {}
