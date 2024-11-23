import express from 'express';
import { OrderController } from './order.controller';
const router = express.Router();

router.post('/', OrderController.orderAbook);
router.get('/revenue', OrderController.calculateRevenue);

const OrderRoute = router;
export default OrderRoute;
