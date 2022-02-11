const sinon = require("sinon");
const { expect } = require("chai");

const ProductsController = require("../../controllers/productsController");
const ProductsService = require("../../services/productsService");
const SalesController = require("../../controllers/saleController");
const SalesService = require("../../services/saleService");
const { mockSales } = require("./fixtures");

describe("Tests the productsController layer", () => {
  describe("When you successfully create a new product", async () => {
    const res = {};
    const req = {};

    before(() => {
      req.body = { name: "Exemple", quantity: 50 };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(ProductsService, "create").resolves({ id: 1, name: "Exemple", quantity: 10 });
    });

    after(() => {
      ProductsService.create.restore();
    });

    it("must have code 201", async () => {
      await ProductsController.create(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
    });
  });

  describe("When list all products", () => {
    describe("When there are products", async () => {
      const res = {};
      const req = {};

      before(() => {
        req.body = { name: "Exemple", quantity: 50 };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(ProductsService, "getAll").resolves({ id: 1, name: "Exemple", quantity: 10 }, { id: 2, name: "Exemple", quantity: 10 });
      });

      after(() => {
        ProductsService.getAll.restore();
      });

      it("must have code 200", async () => {
        await ProductsController.getAll(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
    });
  });

  describe("When you update a product", () => {
    describe("when the product is successfully updated", async () => {
      const res = {};
      const req = {};

      before(() => {
        req.body = { id: 1, name: "Exemple", quantity: 50 };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(ProductsService, "update").resolves({ id: 1, name: "Exemple", quantity: 10 });
      });

      after(() => {
        ProductsService.update.restore();
      });

      it("must have code 200", async () => {
        req.params = 1;
        await ProductsController.update(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
    });
  });

  describe("When you delete a product", () => {
    describe("when the product is successfully deleted", async () => {
      const res = {};
      const req = {};

      before(() => {
        req.body = { id: 100, name: "Exemple", quantity: 500 };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(ProductsService, "remove").resolves({ id: 100, name: "Exemple", quantity: 500 });
      });

      after(() => {
        ProductsService.remove.restore();
      });

      it("must have code 200", async () => {
        req.params = 100;
        await ProductsController.remove(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
    });
  });
});

describe("Tests the salesController layer", () => {
  describe("When you create a new sale", async () => {
    const res = {};
    const req = {};

    before(async () => {
      req.body = [{ product_id: 1, quantity: 50 }];

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(SalesService, "createSale").resolves([{ saleId: 1, productId: "Exemple", quantity: 10 }]);
    });

    after(() => {
      SalesService.createSale.restore();
    });

    it("must have code 201", async () => {
      await SalesController.createSale(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
    });
  });

  describe("When list all sales", () => {
    describe("when there are sales", async () => {
      const res = {};
      const req = {};

      before(() => {
        req.body = mockSales;

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(SalesService, "getAll").resolves(mockSales);
      });

      after(() => {
        SalesService.getAll.restore();
      });

      it("must have code 200", async () => {
        await SalesController.getAll(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
    });
  });

  describe("When you update a product", () => {
    describe("when the product is successfully updated", async () => {
      const res = {};
      const req = {};

      before(async () => {
        req.body = { id: 75, productId: 5, quantity: 50 };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(SalesService, "update").resolves({ id: 75, productId: 5, quantity: 50 });
      });

      after(() => {
        SalesService.update.restore();
      });

      it("must have code 200", async () => {
        req.params = 75;
        await SalesController.update(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
    });
  });
});
