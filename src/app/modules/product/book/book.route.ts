import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.get('/:productId', BookController.getaBook);
router.put('/:productId', BookController.upDateAbook);
router.delete('/:productId', BookController.deleteAbook);
router.get('/', BookController.getAllBooksData);
router.post('/', BookController.createAbook);

export const BookRoute = router;
