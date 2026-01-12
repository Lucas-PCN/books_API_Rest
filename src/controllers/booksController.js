import { pool } from '../database/db.js';

export const getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM books WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar livro' });
  }
};

export const searchBooks = async (req, res) => {
  const { name, category } = req.query;

  try {
    if (name) {
      const result = await pool.query(
        'SELECT * FROM books WHERE LOWER(name) LIKE LOWER($1)',
        [`%${name}%`]
      );
      return res.json(result.rows);
    }

    if (category) {
      const result = await pool.query(
        'SELECT * FROM books WHERE LOWER(category) = LOWER($1)',
        [category]
      );
      return res.json(result.rows);
    }

    const result = await pool.query('SELECT * FROM books ORDER BY id');
    return res.json(result.rows);

  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar livros' });
  }
};