import { Request, Response } from 'express';
import { BookModel } from '../product/book/book.model';
import { OrderService } from './order.service';

const orderAbook = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const productData = await BookModel.findById(orderData.product);

    if (!productData) {
      throw new Error('Product not Found!');
    }

    if (productData.quantity < orderData.quantity) {
      throw new Error(' Insufficient stock!');
    }

    if (productData.inStock === false) {
      throw new Error(' Insufficient stock!');
    }

    productData.quantity = productData.quantity - orderData.quantity;

    if (productData.quantity <= 0) {
      productData.inStock = false;
    }

    const saveOrder = await OrderService.saveOrderIntoDb(orderData);
    const updateBookData = await productData.save();

    res.json({
      message: 'Order created successfully',
      status: true,
      updateBookData,
      data: saveOrder,
    });
  } catch (error) {
    res.json({
      message: 'Something went wrong!',
      status: false,
      error,
    });
  }
};

const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.calculateRevenueFromOrder();

    res.json({
      message: 'Revenue calculated successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    res.json({
      message: 'Something went wrong!',
      status: false,
      error,
    });
  }
};

export const OrderController = { orderAbook, calculateRevenue };
