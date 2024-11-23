import { TBook } from './book.interface';
import mongoose, { Schema } from 'mongoose';

const bookSchema = new Schema<TBook>(
  {
    title: {
      type: String,
      required: [true, 'Book Title is requied!'],
      unique: true,
    },
    author: {
      type: String,
      required: [true, 'Author Name is required!'],
    },
    price: {
      type: Number,
      required: [true, 'Book Price Field is required!'],
    },
    category: {
      type: String,
      enum: {
        values: [
          'Fiction',
          'Science',
          'SelfDevelopment',
          'Poetry',
          'Religious',
        ],
        message: '{VALUE} is invalid for this field!',
      },
    },
    description: {
      type: String,
      required: [true, 'Book Description Field is required!'],
    },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  { timestamps: true },
);

export const BookModel = mongoose.model<TBook>('Book', bookSchema);
