export type TBook = {
  title: string;
  author: string;
  price: number;
  category: 'Fiction' | 'Science' | 'SelfDevelopment' | 'Poetry' | 'Religious';
  description: string;
  quantity: number;
  inStock: boolean;
};

export type QueryType = {
  $or?: Array<{ [key: string]: { $regex: RegExp } }>;
};

export interface ValidationError {
  message: string;
  name: string;
  properties: {
    message: string;
    type: string;
    min: number;
  };
  kind: string;
  path: (string | number)[];
  value: string | number | boolean;
}

export type ValidationErrorMap = Record<string, ValidationError>;
