import { z } from 'zod';

const orderValidationByZod = z.object({
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  product: z
    .string()
    .min(1, 'Product ID is required')
    .regex(/^[a-fA-F0-9]{24}$/, 'Invalid product ID format'),
  quantity: z
    .number()
    .int('Quantity must be an integer')
    .positive('Quantity must be a positive number')
    .min(1, 'Quantity must be at least 1'),
  totalPrice: z
    .number()
    .positive('Total price must be a positive number')
    .min(1, 'Total price must be at least 1'),
});

export default orderValidationByZod;
