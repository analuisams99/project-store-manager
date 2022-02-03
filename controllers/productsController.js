const productService = require('../services/productsService');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  
  const product = await productService.create({ name, quantity });

  res.status(201).json(product);
};

const getAll = async (_req, res) => {
  const products = await productService.getAll();
  
  res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.getById({ id });
  
  if (!product) return res.status(404).json({ message: 'Product not found' });
  
  res.status(200).json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await productService.update({ id, name, quantity });

  res.status(200).json(product);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};