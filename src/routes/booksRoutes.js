import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Rota de livros funcionando 🚀' });
});

export default router;
