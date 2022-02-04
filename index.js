require('dotenv').config();

const express = require('express');
const { create, getById, getAll, update, remove } = require('./controllers/productsController');
const { createSale } = require('./controllers/saleController');
const errorMiddleware = require('./middlewares/errorMiddleware');
const { 
  validateName,
  validateQuantity, 
  validateIfNameAlreadyExist,
  validateIfExist,
  validateProductId,
  validateSalesQuantity,
} = require('./middlewares/validation');

const app = express();
app.use(express.json());
app.use(errorMiddleware);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.route('/products/:id')
  .put(validateName, validateQuantity, validateIfExist, update)
  .delete(validateIfExist, remove)
  .get(getById);

app.route('/products')
  .post(validateName, validateIfNameAlreadyExist, validateQuantity, create)
  .get(getAll);

app.route('/sales')
  .post(validateProductId, validateSalesQuantity, createSale);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
