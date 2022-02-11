const express = require('express');

const router = express.Router();

const { create, getById, getAll, update, remove } = require('../controllers/productsController');
const { 
  validateName, validateQuantity, validateIfNameAlreadyExist, 
  validateIfExist,
} = require('../middlewares/validation');

router
  .post('/', 
    validateName, validateIfNameAlreadyExist, validateQuantity, create)
  .get('/', getAll)
  .put('/:id', validateName, validateQuantity, validateIfExist, update)
  .delete('/:id', validateIfExist, remove)
  .get('/:id', getById);  

  module.exports = router;