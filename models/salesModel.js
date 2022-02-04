const connection = require('./connection');

const createSaleDate = async () => {
  const queryCreateSaleDate = 'INSERT INTO sales () VALUES ()';
  const [saleDate] = await connection.execute(queryCreateSaleDate);
  return {
    id: saleDate.insertId,
  };
};

const createSale = async ({ id, productId, quantity }) => {
  try {
    const query = 'INSERT INTO sales_products (sale_id,product_id, quantity) VALUES (?, ?, ?)';
    await connection.execute(query, [id, productId, quantity]);
    return {
      id,
    };
  } catch (error) {
    return error;
  }
};

const getAll = async () => {
  const query = `SELECT sp.sale_id AS saleId, s.date, sp.product_id, sp.quantity 
    FROM sales_products AS sp
    JOIN sales AS s ON sp.sale_id = s.id`;
  const [allSales] = await connection.execute(query);
  return allSales;
};

const getById = async (id) => {
  const query = `SELECT sls.date, sl.product_id, sl.quantity FROM sales_products AS sl
  JOIN sales AS sls ON sl.sale_id = sls.id WHERE sl.sale_id = ?`;
  const [sales] = await connection.execute(query, [id]);
  return sales;
};

const update = async (saleId, productId, quantity) => {
  const query = 'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?';
  await connection.execute(query, [quantity, saleId, productId]);
};

const remove = async (id) => {
  const querySales = 'DELETE FROM sales WHERE id = ?';

  const result = await connection.execute(querySales, [id]);

  return result;
};

module.exports = {
  createSaleDate,
  createSale,
  getAll,
  getById,
  update,
  remove,
};
