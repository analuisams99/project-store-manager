const productsModel = require('../models/productsModel');

const create = async ({ name, quantity }) => {
  const product = await productsModel.create({ name, quantity });

  return product;
};

const getByName = async (name) => {
  const product = await productsModel.getByName(name);
  return product;
};

module.exports = {
  create,
  getByName,
};