import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MICROSERVICE_MESSAGE_PATTERN } from "./../../utilities/constant/microservice.constant";
import { OrderService } from './order.service';
import { CreateOrderRequestInterface } from 'src/utilities/interfaces/orders/create-order-interface';
import { UpdateOrderRequestInterface } from 'src/utilities/interfaces/orders/udpate-order-interface';

@Controller()
export default class OrderController {
    constructor(private _orderService: OrderService) { }

    @MessagePattern(MICROSERVICE_MESSAGE_PATTERN.ORDER_SERVICE.CREATE)
    createOrder(
        @Payload() data: CreateOrderRequestInterface
    ): Promise<any> {
        console.log('createOrder in Order Service Controller' + JSON.stringify(data));
        return this._orderService.createOrder(data);
    }

    @MessagePattern(MICROSERVICE_MESSAGE_PATTERN.ORDER_SERVICE.UPDATE)
    updateOrder(
        @Payload() data: UpdateOrderRequestInterface
    ): Promise<any> {
        return this._orderService.updateOrder(data);
    }

    @MessagePattern(MICROSERVICE_MESSAGE_PATTERN.ORDER_SERVICE.DELETE)
    deleteOrder(@Payload() data: string): Promise<any> {
        return this._orderService.deleteOrder(data);
    }
}