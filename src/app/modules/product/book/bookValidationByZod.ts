import { z } from 'zod';

const bookValidationData = z.object({
  title: z.string().min(1, { message: 'Book Title is required!' }),
  author: z.string().min(1, { message: 'Author Name is required!' }),
  price: z.number().min(0, { message: 'Price must be a positive number' }),

  category: z.enum(
    ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
    {
      errorMap: () => ({ message: '{VALUE} is invalid for this field!' }),
    },
  ),
  description: z
    .string()
    .min(1, { message: 'Book Description Field is required!' }),
  quantity: z
    .number()
    .min(0, { message: 'Quantity must be a positive number' }),
  inStock: z.boolean({ required_error: 'InStock field is required!' }),
});

export default bookValidationData;
