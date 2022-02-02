const productService = require('../services/productsService');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  
  const product = await productService.create({ name, quantity });

  res.status(201).json(product);
};

module.exports = {
  create,
};