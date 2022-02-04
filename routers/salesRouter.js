const express = require('express');

const router = express.Router();

const { createSale, getAll, getById, update, remove } = require('../controllers/saleController');
const { 
  validateProductId,
  validateSalesQuantity,
} = require('../middlewares/validation');

router
  .post('/', validateProductId, validateSalesQuantity, createSale)
  .get('/', getAll)
  .put('/:id', validateProductId, validateSalesQuantity, update)
  .delete('/:id', remove)
  .get('/:id', getById);

module.exports = router;