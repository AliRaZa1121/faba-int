import { Inject, Injectable } from '@nestjs/common';
import {
    ClientProxy,
} from '@nestjs/microservices';
import { MICROSERVICE_MESSAGE_PATTERN, MICROSERVICES } from 'src/utilities/constant/microservice-constant';

@Injectable()
export class NotificationService {

    constructor(
        @Inject(MICROSERVICES.NOTIFICATION_SERVICE)
        private readonly client: ClientProxy,
    ) { }

    sendEmail(data: any) {
        console.log('Sending email notification');
        return this.client.emit('notification-service-trigger-email', data);
    }
}
