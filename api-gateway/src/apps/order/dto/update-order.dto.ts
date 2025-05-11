import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { OrderItemDTO } from './order-item.dto';

export class UpdateOrderRequestDTO {
    @ApiProperty({
        type: [OrderItemDTO],
        description: 'Updated list of order items',
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDTO)
    items?: OrderItemDTO[];

    @ApiProperty({ description: 'Optional remarks or notes', required: false })
    @IsString()
    @IsOptional()
    notes?: string;

    @ApiProperty({
        description: 'Source of the order (e.g., web, mobile)',
        required: false,
        default: 'web',
    })
    @IsString()
    @IsOptional()
    orderSource?: string;
}
