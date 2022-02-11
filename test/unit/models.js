const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');

const ProductsModel = require('../../models/productsModel');
const SalesModels = require('../../models/salesModel');
const { mockProduct, mockProducts, mockSales } = require('./fixtures');

describe("Tests the productsModel layer", () => {
  describe("When you create a new product", () => {
    before(async () => {
      const execute = [{ insertId: 1 }];
      sinon.stub(connection, "execute").resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    describe("when it is successfully entered", async () => {
      it("must return an object", async () => {
        const response = await ProductsModel.create(mockProduct);
        expect(response).to.be.a("object");
      });

      it("the object has an 'id' property", async () => {
        const response = await ProductsModel.create(mockProduct);
        expect(response).to.have.a.property("id");
      });

      it("the object has a 'name' property", async () => {
        const response = await ProductsModel.create(mockProduct);
        expect(response).to.have.a.property("name");
      });

      it("the object has a 'quantity' property", async () => {
        const response = await ProductsModel.create(mockProduct);
        expect(response).to.have.a.property("quantity");
      });
    });
  });


  describe("When list all products", () => {
    describe("When there are no products", () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([[]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it("must return an array", async () => {
        const response = await ProductsModel.getAll();
        expect(response).to.be.an("array");
      });

      it("returns an empty array", async () => {
        const response = await ProductsModel.getAll();
        expect(response).to.be.empty;
      });
    });

    describe("when there are products", () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([mockProducts]);
      });

      after(() => {
        connection.execute.restore();
      });

      it("must return an array", async () => {
        const response = await ProductsModel.getAll();
        expect(response).to.be.an("array");
      });

      it("must return a non-empty array", async () => {
        const response = await ProductsModel.getAll();
        expect(response).to.be.not.empty;
      });

      it("must have an object that has: 'id', 'name' and 'quantity'", async () => {
        const [product] = await ProductsModel.getAll();
        expect(product).to.include.all.keys(
          "id",
          "name",
          "quantity"
        );
      });
    });

    describe("When there are products and search using id", () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([mockProducts]);
      });

      after(() => {
        connection.execute.restore();
      });

      it("must return an array", async () => {
        const response = await ProductsModel.getAll();
        expect(response).to.be.an("array");
      });

      it("must return a non-empty array", async () => {
        const response = await ProductsModel.getAll();
        expect(response).to.be.not.empty;
      });

      it("must have an object that has: 'id', 'name' and 'quantity'", async () => {
        const [product] = await ProductsModel.getAll();
        expect(product).to.include.all.keys(
          "id",
          "name",
          "quantity"
        );
      });
    });
  });
});

describe("When you update a product", () => {
  before(async () => {
    sinon.stub(connection, 'execute').resolves([mockProducts]);
  });

  after(async () => {
    connection.execute.restore();
  });

  it("must return an object", async () => {
    const response = await ProductsModel.update(1, [mockProducts]);
    expect(response).to.be.an('object');
  });

  it("must have an object that has: 'id', 'name', 'quantity'", async () => {
    const response = await ProductsModel.update(1, [mockProducts]);
    expect(response).to.contain.all.keys('id', 'name', 'quantity');
  });
});

describe("Tests the salesModel layer", () => {
  describe("When list all sales", () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([mockSales]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it("must return an array", async () => {
      const response = await SalesModels.getAll();
      expect(response).to.be.an('array');
    });

    it("must have an object that has: 'saleId', 'date', 'product_id' and 'quantity'", async () => {
      const [response] = await SalesModels.getAll();
      expect(response).to.contain.all.keys('saleId', 'date', 'product_id', 'quantity');
    });
  });

  describe("When looking for a sale by id", () => {
    describe("When the id is valid", () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves([mockSales]);
      });

      after(async () => {
        connection.execute.restore();
      });

      it("must return an array", async () => {
        const response = await SalesModels.getById(1);
        expect(response).to.be.an('array');
      });

      it("must have an object that has: 'date', 'product_id', 'quantity'", async () => {
        const [response] = await SalesModels.getById(2);
        expect(response).to.contain.all.keys('date', 'product_id', 'quantity');
      });
    });

    describe("When the id is invalid", () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves([]);
      });

      after(async () => {
        connection.execute.restore();
      });

      it("retorna undefined", async () => {
        const response = await SalesModels.getById(5);
        expect(response).to.be.undefined;
      });
    });
  })

});