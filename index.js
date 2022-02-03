require('dotenv').config();

const express = require('express');
const { create, getById, getAll } = require('./controllers/productsController');
const { 
  validadeName,
  validateQuantity, 
  validateIfNameAlreadyExist,
} = require('./middlewares/productMiddlewares');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.route('/products/:id')
  .get(getById);

app.route('/products')
  .post(validadeName, validateIfNameAlreadyExist, validateQuantity, create)
  .get(getAll);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
