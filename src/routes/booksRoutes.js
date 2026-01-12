import { Router } from 'express';
import {
  getBookById,
  searchBooks,
  createBook,
  updateBook,
  deleteBook
} from '../controllers/booksController.js';

const router = Router();

router.get('/', searchBooks);
router.get('/:id', getBookById);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;
