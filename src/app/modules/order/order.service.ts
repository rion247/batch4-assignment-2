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
        from: 'books',
        let: { productId: { $toObjectId: '$product' } },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$_id', '$$productId'] },
            },
          },
        ],
        as: 'bookDetails',
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
