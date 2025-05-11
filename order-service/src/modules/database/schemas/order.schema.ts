import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true, versionKey: false })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({
    type: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    required: true,
  })
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];

  @Prop({ required: true })
  total: number;

  @Prop({ default: 'pending', enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'] })
  status: string;

  @Prop()
  notes?: string;

  @Prop({ default: 'web' })
  orderSource: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
