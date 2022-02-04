const errors = {
  nameBlank: '"name" is required',
  nameLength: '"name" length must be at least 5 characters long',
  nameAlreadyExist: 'Product already exists',
  quantityBlank: '"quantity" is required',
  quantityNotNumber: '"quantity" must be a number larger than or equal to 1',
  productNotFound: 'Product not found',
  productBlank: '"product_id" is required',
};

const MIN_NUMBER = 1;
const MIN_CHARACTERS = 5;

const blank = (value) => (value === undefined);
const isNotNumber = (value) => (typeof value !== 'number');
const isLetterLengthLessThan = (value, min) => (value.length < min);
const isNumberLargerThan = (value, min) => (value < min);

const validateName = (name) => {
  switch (true) {
    case blank(name): return { code: 400, message: errors.nameBlank };
    case isLetterLengthLessThan(name, MIN_CHARACTERS): 
      return { code: 422, message: errors.nameLength };
    default: return {};
  }
};

const validateQuantity = (quantity) => {
  switch (true) {
    case blank(quantity): return { code: 400, message: errors.quantityBlank };
    case isNotNumber(quantity): return { code: 422, message: errors.quantityNotNumber };
    case isNumberLargerThan(quantity, MIN_NUMBER):
       return { code: 422, message: errors.quantityNotNumber };
    default: return {};
  }
};

const validateProductId = (arraySales) => {
  const isInvalid = arraySales.some(({ product_id: productId }) => blank(productId));

  if (isInvalid) return { code: 400, message: errors.productBlank };
};

const validateSalesQuantity = (arraySales) => {
  const isBlank = arraySales.some(({ quantity }) => blank(quantity));
  if (isBlank) return { code: 400, message: errors.quantityBlank };

  const notNumber = arraySales.some(({ quantity }) => isNotNumber(quantity));

  const numberLargerThen = arraySales.some(
    ({ quantity }) => isNumberLargerThan(quantity, MIN_NUMBER),
  );

  if (notNumber || numberLargerThen) return { code: 422, message: errors.quantityNotNumber };
};

module.exports = {
  errors,
  validateName,
  validateQuantity,
  validateProductId,
  validateSalesQuantity,
};