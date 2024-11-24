"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderValidationByZod = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format').min(1, 'Email is required'),
    product: zod_1.z
        .string()
        .min(1, 'Product ID is required')
        .regex(/^[a-fA-F0-9]{24}$/, 'Invalid product ID format'),
    quantity: zod_1.z
        .number()
        .int('Quantity must be an integer')
        .positive('Quantity must be a positive number')
        .min(1, 'Quantity must be at least 1'),
    totalPrice: zod_1.z
        .number()
        .positive('Total price must be a positive number')
        .min(1, 'Total price must be at least 1'),
});
exports.default = orderValidationByZod;
