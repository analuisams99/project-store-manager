const salesModel = require('../models/salesModel');

const mapSales = (arraySales) => arraySales.map((sale) => ({ 
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

module.exports = {
  createSale,
  mapSales,
};