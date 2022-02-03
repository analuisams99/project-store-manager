const errors = {
  nameBlank: '"name" is required',
  nameLength: '"name" length must be at least 5 characters long',
  nameAlreadyExist: 'Product already exists',
  quantityBlank: '"quantity" is required',
  quantityNotNumber: '"quantity" must be a number larger than or equal to 1',
  productNotFound: 'Product not found',
};

const blank = (value) => (value === undefined);
const isNotNumber = (value) => (typeof value !== 'number');
const isLengthLetterThen = (value, min) => (value.length < min);
const isNumberLargerThen = (value, min) => (value < min);

const validateName = (name) => {
  const MIN_CHARACTERS = 5;

  switch (true) {
    case blank(name): return { code: 400, message: errors.nameBlank };
    case isLengthLetterThen(name, MIN_CHARACTERS): return { code: 422, message: errors.nameLength };
    default: return {};
  }
};

const validateQuantity = (quantity) => {
  const MIN_NUMBER = 1;

  switch (true) {
    case blank(quantity): return { code: 400, message: errors.quantityBlank };
    case isNotNumber(quantity): return { code: 422, message: errors.quantityNotNumber };
    case isNumberLargerThen(quantity, MIN_NUMBER):
       return { code: 422, message: errors.quantityNotNumber };
    default: return {};
  }
};

module.exports = {
  errors,
  validateName,
  validateQuantity,
};