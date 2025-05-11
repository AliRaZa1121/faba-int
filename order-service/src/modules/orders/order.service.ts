import { Injectable } from '@nestjs/common';
import { CreateOrderRequestInterface } from 'src/utilities/interfaces/orders/create-order-interface';
import { UpdateOrderRequestInterface } from 'src/utilities/interfaces/orders/udpate-order-interface';
import { DatabaseService } from '../database/database.service';
import { Order } from '../database/schemas/order.schema';

@Injectable()
export class OrderService {
    constructor(
        private _databaseService: DatabaseService,
    ) { }

    async createOrder(data: CreateOrderRequestInterface): Promise<Order> {

        const total = data.items.reduce((acc, item) => {
            return acc + (item.price * item.quantity);
        }, 0);

        const orderData = {
            userId: data.userId,
            items: data.items,
            notes: data.notes,
            orderSource: data.orderSource,
            total: total,
        };

        const createdOrder = await this._databaseService.orderModel.create(orderData);
        const order = await this._databaseService.orderModel.findById(createdOrder._id);

        if (!order) {
            throw new Error('Order not found after creation');
        }

        return order;
    }

    async updateOrder(data: UpdateOrderRequestInterface): Promise<Order> {

        const total = data.items.reduce((acc, item) => {
            return acc + (item.price * item.quantity);
        }, 0);
        Object.assign(data, { total });

        const updatedOrder = await this._databaseService.orderModel.findByIdAndUpdate(
            data.id,
            { $set: data },
            { new: true }
        );

        if (!updatedOrder) {
            throw new Error('Order not found');
        }

        return updatedOrder;
    }


    async deleteOrder(id: string): Promise<Order> {
        console.log('deleteOrder in Order Service' + id);
        const deletedOrder = await this._databaseService.orderModel.findByIdAndDelete(id);

        if (!deletedOrder) {
            throw new Error('Order not found');
        }

        return deletedOrder;
    }

}