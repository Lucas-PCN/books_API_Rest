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

export const createBook = async (req, res) => {
  const { name, category, price } = req.body;

  if (!name || !category || !price) {
    return res.status(400).json({ error: 'Nome, categoria e preço são obrigatórios' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO books (name, category, price) VALUES ($1, $2, $3) RETURNING *',
      [name, category, price]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar livro' });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { name, category, price } = req.body;

  try {
    const result = await pool.query(
      'UPDATE books SET name = $1, category = $2, price = $3 WHERE id = $4 RETURNING *',
      [name, category, price, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar livro' });
  }
};

export const patchBook = async (req, res) => {
    const { id } = req.params;
    const { name, category, price } = req.body;
  
    try {
      // Primeiro, buscamos o livro atual
      const current = await pool.query(
        'SELECT * FROM books WHERE id = $1',
        [id]
      );
  
      if (current.rows.length === 0) {
        return res.status(404).json({ error: 'Livro não encontrado' });
      }
  
      const book = current.rows[0];
  
      // Se não vier no body, mantém o valor atual
      const newName = name ?? book.name;
      const newCategory = category ?? book.category;
      const newPrice = price ?? book.price;
  
      const updated = await pool.query(
        'UPDATE books SET name = $1, category = $2, price = $3 WHERE id = $4 RETURNING *',
        [newName, newCategory, newPrice, id]
      );
  
      return res.json(updated.rows[0]);
  
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar livro' });
    }
  };
  

export const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM books WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }

    return res.json({ message: 'Livro deletado com sucesso' });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao deletar livro' });
  }
};
