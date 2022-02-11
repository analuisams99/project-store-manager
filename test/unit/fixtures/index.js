const mockProduct = {
  "name": "exempleName",
  "quantity": 10,
};

const mockProduct2 = [
  {
    "id": 1,
    "name": "exampleName",
    "quantity": 10,
  },
]

const mockProducts = [
  {
    id : 1,
    name: 'exampleName',
    quantity: 10,
  },
];

const mockedProduct = {
  id: 4,
  name: 'exampleName',
  quantity: 10,
};

const mockSales = [
  {
    "saleId": 1,
    "date": "2022-02-07T14:23:05.000Z",
    "product_id": 2,
    "quantity": 5
  },
  {
    "saleId": 2,
    "date": "2022-02-07T14:23:15.000Z",
    "product_id": 1,
    "quantity": 15
  },
];

const mockedIdSales = [
    {
      "date": "2022-02-07T14:23:05.000Z",
      "product_id": 2,
      "quantity": 5
    },
];

module.exports = {
  mockProduct,
  mockProduct2,
  mockProducts,
  mockedProduct,
  mockSales,
  mockedIdSales,
};
