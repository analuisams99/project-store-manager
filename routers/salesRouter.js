const express = require('express');

const router = express.Router();

const { createSale, getAll, getById } = require('../controllers/saleController');
const { 
  validateProductId,
  validateSalesQuantity,
} = require('../middlewares/validation');

router
  .post('/', validateProductId, validateSalesQuantity, createSale)
  .get('/', getAll)
  .get('/:id', getById);

module.exports = router;