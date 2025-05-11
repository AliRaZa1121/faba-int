import { Body, Delete, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ApiRouting } from 'src/core/decorators/api-controller.decorator';
import { BaseResponseDto } from 'src/utilities/swagger-responses/base-response';
import { CreateOrderResponseDTO } from 'src/utilities/swagger-responses/orders/create-order-response';
import { CreateOrderRequestDTO } from './dto/create-order.dto';
import { UpdateOrderRequestDTO } from './dto/update-order.dto';
import { OrderService } from './order.service';
import { Authorized } from 'src/core/decorators/authorize.decorator';
import { UserDocument } from 'src/modules/database/schemas/users.schema';
import { AuthUser } from 'src/core/decorators/auth-user.decorator';

@ApiRouting({ tag: 'Orders', path: '/order' })
export default class OrderController {
    constructor(private _orderService: OrderService) { }

    @Post('/create')
    @Authorized()
    @ApiResponse({ status: HttpStatus.CREATED, type: CreateOrderResponseDTO })
    createOrder(
        @Body() data: CreateOrderRequestDTO,
        @AuthUser() authUser: UserDocument,
    ): Promise<BaseResponseDto<CreateOrderResponseDTO>> {
        Object.assign(data, { userId: authUser._id });
        return this._orderService.createOrder(data);
    }

    @Put('/update/:id')
    @Authorized()
    @ApiResponse({ status: HttpStatus.OK, type: UpdateOrderRequestDTO })
    updateOrder(
        @Param('id') id: string,
        @Body() data: UpdateOrderRequestDTO,
    ): Promise<BaseResponseDto<CreateOrderResponseDTO>> {
        return this._orderService.updateOrder(id, data);
    }

    @Delete('/delete/:id')
    @Authorized()
    @ApiResponse({ status: HttpStatus.OK, type: BaseResponseDto })
    deleteOrder(@Param('id') id: string,
    ): Promise<BaseResponseDto<void>> {
        return this._orderService.deleteOrder(id);
    }
}