import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICES } from 'src/utilities/constant/microservice-constant';
import { NotificationService } from './notification.service';

@Global()
@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: MICROSERVICES.NOTIFICATION_SERVICE,
                inject: [ConfigService],
                useFactory: async (configService: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        urls: [
                            configService.get<string>('RABBITMQ.URI') || 'amqp://guest:guest@localhost:5672',
                        ],
                        queue: configService.get<string>('RABBITMQ.QUEUE') || 'notifications',
                        queueOptions: {
                            durable: true,
                        },
                    },
                }),
            },
        ]),
    ],
    providers: [NotificationService],
    exports: [NotificationService],
})
export class NotificationModule { }
