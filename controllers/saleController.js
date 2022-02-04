const saleService = require('../services/saleService');

const createSale = async (req, res) => {
  const arraySales = req.body;
  const { id } = await saleService.createSale(arraySales);

  return res.status(201).json({ id, itemsSold: arraySales });
};

const getAll = async (_req, res) => {
  const allSales = await saleService.getAll();

  return res.status(200).json(allSales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sales = await saleService.getById(id);

  if (!sales || sales.length === 0) return res.status(404).json({ message: 'Sale not found' });

  return res.status(200).json(sales);
};

const update = async (req, res) => {
  const { id } = req.params;
  const sales = req.body;
  const sale = await saleService.update(+id, sales[0]);

  return res.status(200).json(sale);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const sale = await saleService.remove(+id);

  if (!sale || sale.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  return res.status(200).json(sale);
};
module.exports = {
  createSale,
  getAll,
  getById,
  update,
  remove,
};
