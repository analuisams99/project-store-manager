const productsModel = require('../models/productsModel');

const create = async ({ name, quantity }) => {
  const product = await productsModel.create({ name, quantity });
  return product;
};

const getByName = async ({ name }) => {
  const product = await productsModel.getByName({ name });
  return product;
};

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async ({ id }) => {
  const product = await productsModel.getById({ id });
  return product;
};

const update = async ({ id, name, quantity }) => {
  const product = await productsModel.update({ id, name, quantity });
  return product;
};

module.exports = {
  create,
  getByName,
  getAll,
  getById,
  update,
};