import { Request, Response } from 'express';
import { pool } from '../db';
import { Product } from '../models/product.models';

export const getProducts = async (_: Request, res: Response) => {
  const result = await pool.query('SELECT * FROM products');
  res.json(result.rows);
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price } = req.body;
  const result = await pool.query(
    'INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *',
    [name, description, price]
  );
  res.json(result.rows[0]);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const result = await pool.query(
    'UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *',
    [name, description, price, id]
  );
  res.json(result.rows[0]);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  await pool.query('DELETE FROM products WHERE id = $1', [id]);
  res.sendStatus(204);
};
