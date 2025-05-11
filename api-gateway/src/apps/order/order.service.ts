// src/app/order/order.service.ts
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BaseResponseDto } from 'src/utilities/swagger-responses/base-response';
import { CreateOrderRequestDTO } from './dto/create-order.dto';
import { UpdateOrderRequestDTO } from './dto/update-order.dto';
import { CreateOrderResponseDTO } from 'src/utilities/swagger-responses/orders/create-order-response';
import { successApiWrapper } from 'src/utilities/constant/response-constant';
import { MICROSERVICE_MESSAGE_PATTERN, MICROSERVICES } from 'src/utilities/constant/microservice-constant';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
    constructor(
        @Inject(MICROSERVICES.ORDER_SERVICE)
        private readonly orderClient: ClientProxy,
    ) { }

    async createOrder(
        payload: CreateOrderRequestDTO,
    ): Promise<BaseResponseDto<CreateOrderResponseDTO>> {
        const response = await firstValueFrom(
            this.orderClient.send<CreateOrderResponseDTO>(MICROSERVICE_MESSAGE_PATTERN.ORDER_SERVICE.CREATE, payload),
        );

        return successApiWrapper(response, 'Order created successfully', HttpStatus.CREATED);
    }

    async updateOrder(
        id: string,
        payload: UpdateOrderRequestDTO,
    ): Promise<BaseResponseDto<CreateOrderResponseDTO>> {

        const response = await firstValueFrom(
            this.orderClient.send<CreateOrderResponseDTO>(MICROSERVICE_MESSAGE_PATTERN.ORDER_SERVICE.UPDATE, { id, ...payload }),
        );

        return successApiWrapper(response, 'Order updated successfully', HttpStatus.OK);
    }

    async deleteOrder(id: string): Promise<BaseResponseDto<void>> {
        await firstValueFrom(
            this.orderClient.send<void>(MICROSERVICE_MESSAGE_PATTERN.ORDER_SERVICE.DELETE, id),
        );
        return successApiWrapper(null, 'Order deleted successfully', HttpStatus.OK);
    }
}