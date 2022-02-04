const saleService = require('../services/saleService');

const createSale = async (req, res) => {
  const arraySales = req.body;
  const { id } = await saleService.createSale(arraySales);

  return res.status(201).json({ id, itemsSold: arraySales });
};

module.exports = {
  createSale,
};