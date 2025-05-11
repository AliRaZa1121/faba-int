import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderItemDTO {
    @ApiProperty({ description: 'ID of the product' })
    @IsString()
    @IsNotEmpty()
    productId: string;

    @ApiProperty({ description: 'Quantity of the product ordered' })
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({ description: 'Price of a single product unit' })
    @IsNumber()
    @IsNotEmpty()
    price: number;
}
