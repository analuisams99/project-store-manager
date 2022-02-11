const schemas = require('../schemas');
const productService = require('../services/productsService');

const validateName = (req, res, next) => {
  const { name } = req.body;
  const validationName = schemas.validateName(name);

  if (validationName.message) { 
    const { code, message } = validationName;
    return res.status(code).json({ message }); 
  }
  
  next();
};

const validateIfNameAlreadyExist = async (req, res, next) => {
  const { name } = req.body;
  const productExist = await productService.getByName({ name });

  if (productExist.length > 0) { 
    return res.status(409).json({ message: schemas.errors.nameAlreadyExist }); 
  }

  next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;
  const validationQuantity = schemas.validateQuantity(quantity);

  if (validationQuantity.message) {
    const { code, message } = validationQuantity;

    return res.status(code).json({ message });
  }
  next();
};

const validateIfExist = async (req, res, next) => {
  const { id } = req.params;
  const product = await productService.getById(id);
  
  if (!product) return res.status(404).json({ message: 'Product not found' });
  next();
};

const validateProductId = (req, res, next) => {
  const arraySales = req.body;
  const validationProductId = schemas.validateProductId(arraySales);

  if (validationProductId) { 
    const { code, message } = validationProductId;
    return res.status(code).json({ message }); 
  }
  next();
};

const validateSalesQuantity = (req, res, next) => {
  const arraySales = req.body;
  const validationQuantity = schemas.validateSalesQuantity(arraySales);

  if (validationQuantity) {
    const { code, message } = validationQuantity;
    return res.status(code).json({ message }); 
  }
  next();
};
// here
// const validatesQuantityToSale = async (req, res, next) => {
//   const arraySales = req.body;
//   const validationQuantityToSale = await schemas.validatesQuantityToSale(arraySales);

//   if (validationQuantityToSale) {
//     const { code, message } = validationQuantityToSale;
//     return res.status(code).json({ message }); 
//   }
//   next();
// };

module.exports = { 
  validateName,
  validateIfNameAlreadyExist,
  validateQuantity,
  validateIfExist,
  validateProductId,
  validateSalesQuantity,
  // validatesQuantityToSale,
};