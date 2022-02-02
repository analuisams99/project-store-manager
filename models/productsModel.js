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

const getByName = async (name) => {
  const query = 'SELECT * FROM products WHERE name = ?';
  const [product] = await connection.execute(query, [name]);
  return product;
};

module.exports = { 
  create,
  getByName,
};