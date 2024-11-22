import express from 'express';
import cors from 'cors';
import { BookRoute } from './app/modules/product/book/book.route';

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//router
app.use('/api', BookRoute);

export default app;
