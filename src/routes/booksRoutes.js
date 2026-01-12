import { Router } from 'express';
import {
  getBookById,
  searchBooks
} from '../controllers/booksController.js';

const router = Router();

router.get('/', searchBooks);
router.get('/:id', getBookById);

export default router;
