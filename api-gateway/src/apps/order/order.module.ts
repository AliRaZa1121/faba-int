import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICES } from 'src/utilities/constant/microservice-constant';
import { OrderService } from './order.service';
import OrderController from './order.controller';

@Module({
    imports: [
        ConfigModule,
        ClientsModule.registerAsync([
            {
                name: MICROSERVICES.ORDER_SERVICE,
                useFactory: async (configService: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        urls: ['amqp://guest:guest@rabbitmq:5672'],
                        // urls: [configService.get<string>('RABBITMQ_URI') || 'amqp://guest:guest@rabbitmq:5672'],
                        queue: MICROSERVICES.ORDER_SERVICE,
                        queueOptions: {
                            durable: false,
                        },
                    },
                }),
                inject: [ConfigService],
            },
        ]),
    ],
    controllers: [OrderController],
    providers: [OrderService],
    exports: [OrderService],
})
export class OrderModule { }
