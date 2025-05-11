import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICES } from 'src/utilities/constant/microservice.constant';
import { NotificationService } from './notification.service';

@Global()
@Module({
    imports: [
        ConfigModule,
        ClientsModule.registerAsync([
            {
                name: MICROSERVICES.NOTIFICATION_SERVICE,
                useFactory: async (configService: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        // urls: ['amqp://guest:guest@rabbitmq:5672'],
                        urls: [configService.get<string>('RABBITMQ_URI') || 'amqp://guest:guest@rabbitmq:5672'],
                        queue: MICROSERVICES.NOTIFICATION_SERVICE,
                        queueOptions: {
                            durable: false,
                        },
                    },
                }),
                inject: [ConfigService],
            },
        ]),
    ],
    providers: [NotificationService],
    exports: [NotificationService],
})
export class NotificationModule { }
