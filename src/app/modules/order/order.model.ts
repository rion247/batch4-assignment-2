import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email Field is required!'],
  },
  product: { type: String, required: [true, 'Product Field is required!'] },
  quantity: { type: Number, required: [true, 'Quantity Field is required!'] },
  totalPrice: { type: Number, required: true },
});

export const OrderModel = mongoose.model<IOrder>('Order', orderSchema);
