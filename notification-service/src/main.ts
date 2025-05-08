import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import InjectPipes from './core/injectables/pipes';

async function bootstrap() {

  console.log('Starting notification service...');
  console.log('RABBITMQ_URI:', process.env.RABBITMQ_URI);
  console.log('RABBITMQ_QUEUE:', process.env.RABBITMQ_QUEUE);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URI || 'amqp://guest:guest@rabbitmq:5672'],
      queue: process.env.RABBITMQ_QUEUE || 'notifications',
      queueOptions: {
        durable: true,
      },
    },
  });

  InjectPipes(app);
  await app.listen();
}
void bootstrap();
