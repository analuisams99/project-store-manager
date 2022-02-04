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

module.exports = {
  createSaleDate,
  createSale,
};
