const salesModel = require('../models/salesModel');

const mapSales = (array) => array.map((sale) => ({ 
  productId: sale.product_id, quantity: sale.quantity, 
}));

const createSale = async (arraySales) => {
  const { id } = await salesModel.createSaleDate();
  const sales = await mapSales(arraySales);

  const salesPromise = sales.map(
    ({ productId, quantity }) => salesModel.createSale({ id, productId, quantity }),
);
  await Promise.all(salesPromise);
  
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
  return sale;
};

module.exports = {
  createSale,
  mapSales,
  getAll,
  getById,
  update,
  remove,
};