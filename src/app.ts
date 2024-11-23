import express from 'express';
import cors from 'cors';
import { BookRoute } from './app/modules/product/book/book.route';
import OrderRoute from './app/modules/order/order.route';

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//router
app.use('/api/products', BookRoute);
app.use('/api/orders', OrderRoute);

export default app;
