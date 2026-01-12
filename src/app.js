import express from 'express';
import booksRoutes from './routes/booksRoutes.js';

const app = express();
app.use(express.json());

app.use('/books', booksRoutes);

export default app;
