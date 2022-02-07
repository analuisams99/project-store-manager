const connection = require('./connection');

const create = async ({ name, quantity }) => {
  const query = 'INSERT INTO products (name, quantity) VALUES (?, ?)';
  
  const [product] = await connection.execute(query, [name, quantity]);

  return {
    id: product.insertId,
    name,
    quantity,
  };
};

const getByName = async ({ name }) => {
  const query = 'SELECT * FROM products WHERE name = ?';
  const [product] = await connection.execute(query, [name]);
  return product;
};

const getAll = async () => {
  const query = 'SELECT * FROM products';
  const [products] = await connection.execute(query);
  return products;
};

const getById = async ({ id }) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [product] = await connection.execute(query, [id]);
  return product[0];
};

const update = async ({ id, name, quantity }) => {
  const query = 'UPDATE products SET name = ?, quantity = ? WHERE id = ?';
  const [product] = await connection.execute(query, [name, quantity, id]);

  return {
    id: product.insertId,
    name,
    quantity,
  };
};

const remove = async ({ id }) => {
  const query = 'DELETE FROM products WHERE id = ?';
  await connection.execute(query, [id]);
};

const increment = async (id, quantity) => {
  const query = 'UPDATE products SET quantity = quantity + ? WHERE id = ?';
  await connection.execute(query, [quantity, id]);
};

const decrement = async (id, quantity) => {
  const query = 'UPDATE products SET quantity = quantity - ? WHERE id = ?';
  await connection.execute(query, [quantity, id]);
};

module.exports = { 
  create,
  getByName,
  getAll,
  getById,
  update,
  remove,
  increment,
  decrement,
};