import { Injectable } from '@nestjs/common';
import QueueService from 'src/app/queue/queue.service';
import { SendMailMessageInterface } from 'src/utilities/interfaces/mail-interface';

@Injectable()
export class NotificationService {
    constructor(private readonly queueService: QueueService) { }

    sendEmailNotification(data: SendMailMessageInterface) {
        this.queueService.bullQueEmail(data);
    }
}
