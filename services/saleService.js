const { increment, decrement } = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const mapSales = (array) => array.map((sale) => ({ 
  productId: sale.product_id, quantity: sale.quantity, 
}));

const quantityIncrement = async (sales) => {
  Promise.all(
    sales.map(({ product_id: productId, quantity }) => (
      increment(productId, quantity)
    )),
  );
};

const quantityDecrement = async (sales) => {
  Promise.all(
    sales.map(({ product_id: productId, quantity }) => (
      decrement(productId, quantity)
    )),
  ); 
};

const createSale = async (arraySales) => {
  const { id } = await salesModel.createSaleDate();

  await quantityDecrement(arraySales);

  const sales = await mapSales(arraySales);

  await Promise.all(
    sales.map(({ productId, quantity }) => (
      salesModel.createSale({ id, productId, quantity })
    )),
);  
  return {
    id,
  };
};

const getAll = async () => {
  const allSales = await salesModel.getAll();
  return allSales;
};

const getById = async (id) => {
  const sales = await salesModel.getById(id);
  return sales;
};

const update = async (saleId, sales) => {
  await salesModel.update(saleId, sales.product_id, sales.quantity);
  return { 
    saleId, 
    itemUpdated: [
      { ...sales }], 
  };
};

const remove = async (id) => {
  const sale = await salesModel.getById(id);
  await salesModel.remove(id);
  await quantityIncrement(sale);
  return sale;
};

module.exports = {
  createSale,
  mapSales,
  getAll,
  getById,
  update,
  remove,
  quantityIncrement,
  quantityDecrement,
};