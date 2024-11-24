"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const bookValidationData = zod_1.z.object({
    title: zod_1.z.string().min(1, { message: 'Book Title is required!' }),
    author: zod_1.z.string().min(1, { message: 'Author Name is required!' }),
    price: zod_1.z.number().min(0, { message: 'Price must be a positive number' }),
    category: zod_1.z.enum(['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'], {
        errorMap: () => ({ message: '{VALUE} is invalid for this field!' }),
    }),
    description: zod_1.z
        .string()
        .min(1, { message: 'Book Description Field is required!' }),
    quantity: zod_1.z
        .number()
        .min(0, { message: 'Quantity must be a positive number' }),
    inStock: zod_1.z.boolean({ required_error: 'InStock field is required!' }),
});
exports.default = bookValidationData;
