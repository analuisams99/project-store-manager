const productSchema = require('../schemas/productSchema');
const productService = require('../services/productsService');

const validadeName = (req, res, next) => {
  const { name } = req.body;

  const validationName = productSchema.validateName(name);

  if (validationName.message) { 
    return res.status(validationName.code).json({ message: validationName.message }); 
  }
  
  next();
};

const validateIfNameAlreadyExist = async (req, res, next) => {
  const { name } = req.body;

  const productExist = await productService.getByName({ name });

  if (productExist.length > 0) { 
    return res.status(409).json({ message: productSchema.errors.nameAlreadyExist }); 
  }

  next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;

  const validationQuantity = productSchema.validateQuantity(quantity);
  if (validationQuantity.message) {
    return res.status(validationQuantity.code).json({ message: validationQuantity.message });
  }
  next();
};

const validateIfExist = async (req, res, next) => {
  const { id } = req.params;
  const product = await productService.getById({ id });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  next();
};

module.exports = { 
  validadeName,
  validateIfNameAlreadyExist,
  validateQuantity,
  validateIfExist,
};