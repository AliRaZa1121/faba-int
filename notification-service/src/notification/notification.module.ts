import { Module } from '@nestjs/common';
import { QueueModule } from 'src/app/queue/queue.module';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
    imports: [QueueModule],
    controllers: [NotificationController],
    providers: [NotificationService],
})
export class NotificationModule { }
