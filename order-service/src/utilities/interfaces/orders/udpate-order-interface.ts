export interface UpdateOrderRequestInterface {
    id: string;
    items: OrderItemDTO[];
    notes?: string;
    orderSource?: string;
}

export interface OrderItemDTO {
    productId: string;
    quantity: number;
    price: number;
}
