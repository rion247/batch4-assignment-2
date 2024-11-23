import { IOrder } from './order.interface';
import { OrderModel } from './order.model';

const saveOrderIntoDb = async (value: IOrder) => {
  const result = await OrderModel.create(value);
  return result;
};

const calculateRevenueFromOrder = async () => {
  const revenue = await OrderModel.aggregate([
    {
      $lookup: {
        from: 'books', // The 'books' collection
        let: { productId: { $toObjectId: '$product' } }, // Convert product to ObjectId
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$_id', '$$productId'] }, // Match the productId with _id in books
            },
          },
        ],
        as: 'bookDetails', // Alias for the joined book details
      },
    },

    {
      $unwind: '$bookDetails',
    },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: { $multiply: ['$quantity', '$bookDetails.price'] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);

  return revenue;
};

export const OrderService = {
  saveOrderIntoDb,
  calculateRevenueFromOrder,
};
