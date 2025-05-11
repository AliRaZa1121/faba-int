import { Inject, Injectable } from '@nestjs/common';
import {
    ClientProxy,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MICROSERVICE_MESSAGE_PATTERN, MICROSERVICES } from 'src/utilities/constant/microservice.constant';

@Injectable()
export class NotificationService {

    constructor(
        @Inject(MICROSERVICES.NOTIFICATION_SERVICE)
        private readonly client: ClientProxy,
    ) { }

    async sendEmail(data: any) {
        console.log('Sending email notification');
        this.client.emit(MICROSERVICE_MESSAGE_PATTERN.EMAIL, data);
        // await firstValueFrom(
            // this.client.send<number, number>(MICROSERVICE_MESSAGE_PATTERN.EMAIL, data),
        // );
    }

    async doubleNumber(num: number): Promise<void> {
        await firstValueFrom(
            this.client.send<number, number>('double_number', num),
        );
    }
}
