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
