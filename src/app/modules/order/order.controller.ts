import { Request, Response } from 'express';
import { BookModel } from '../product/book/book.model';
import { OrderService } from './order.service';
import orderValidationByZod from './orderValidationByZod';

const orderAbook = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    //zod validation
    const validOrderData = orderValidationByZod.parse(orderData);

    const productData = await BookModel.findById(orderData.product);

    if (!productData) {
      // throw new Error('Product not Found!');
      res.status(404).json({
        message: 'Book not found!',
        success: false,
      });
      return;
    }

    if (productData.quantity < validOrderData.quantity) {
      throw new Error('Insufficient stock!');
    }

    if (productData.inStock === false) {
      throw new Error('Insufficient stock!');
    }

    productData.quantity = productData.quantity - validOrderData.quantity;

    if (productData.quantity <= 0) {
      productData.inStock = false;
    }

    const saveOrder = await OrderService.saveOrderIntoDb(validOrderData);
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
