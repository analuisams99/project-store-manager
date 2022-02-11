const sinon = require("sinon");
const { expect } = require("chai");

const ProductsModel = require("../../models/productsModel");
const ProductsService = require("../../services/productsService");
const SalesModel = require("../../models/salesModel");
const SalesService = require("../../services/saleService");

const { mockProduct, mockProduct2, mockedProduct, mockSales, mockedIdSales } = require("./fixtures");

describe("Tests the productsService layer", () => {
  describe("When you create a new product", () => {
    describe("When you successfully create a new product", async () => {
      before(async () => {
        const ID = 1;
        sinon.stub(ProductsModel, "create").resolves({ id: ID });
      });

      after(() => {
        ProductsModel.create.restore();
      });

      it("must return an object", async () => {
        const product = await ProductsService.create(mockProduct);
        expect(product).to.be.a("object");
      });

      it("the object has an 'id' property", async () => {
        const product = await ProductsService.create(mockProduct);
        expect(product).to.have.a.property("id");
      });
    });
  });

  describe("When list all products", () => {
    describe("when there are no products", () => {
      before(async () => {
        sinon.stub(ProductsModel, "getAll").resolves([]);
      });

      after(() => {
        ProductsModel.getAll.restore();
      });

      it("must return an array", async () => {
        const response = await ProductsService.getAll();
        expect(response).to.be.an("array");
      });

      it("returns an empty array", async () => {
        const response = await ProductsService.getAll();
        expect(response).to.be.empty;
      });
    });

    describe("when there are products", () => {
      before(async () => {
        sinon.stub(ProductsModel, "getAll").resolves(mockProduct2);
      });

      after(() => {
        ProductsModel.getAll.restore();
      });

      it("must return an array", async () => {
        const response = await ProductsService.getAll();
        expect(response).to.be.an("array");
      });

      it("must return a non-empty array", async () => {
        const response = await ProductsService.getAll();
        expect(response).to.be.not.empty;
      });

      it("must have an object that has: 'id', 'name' and 'quantity'", async () => {
        const [item] = await ProductsService.getAll();
        expect(item).to.include.all.keys("id", "name", "quantity");
      });
    });

    describe("When there are products and search using id", () => {
      before(async () => {
        sinon.stub(ProductsModel, "getById").resolves(mockProduct2);
      });

      after(() => {
        ProductsModel.getById.restore();
      });

      it("must return an array", async () => {
        const response = await ProductsService.getById();
        expect(response).to.be.an("array");
      });

      it("must return a non-empty array", async () => {
        const response = await ProductsService.getById();
        expect(response).to.be.not.empty;
      });

      it("must have an object that has: 'id', 'name' and 'quantity'", async () => {
        const [product] = await ProductsService.getById();
        expect(product).to.include.all.keys("id", "name", "quantity");
      });
    });
  });

  describe("When you update a product", () => {
    before(async () => {
      sinon.stub(ProductsModel, "update").resolves(mockedProduct);
    });

    after(async () => {
      ProductsModel.update.restore();
    });

    it("must return an object", async () => {
      const response = await ProductsService.update(4, mockedProduct);
      expect(response).to.be.an('object');
    });

    it("must have an object that has: 'id', 'name', 'quantity'", async () => {
      const response = await ProductsService.update(4, mockedProduct);
      expect(response).to.contain.all.keys('id', 'name', 'quantity');
    });
  });
});

describe("Tests the salesService layer", () => {
  describe("When list all sales", () => {
    before(async () => {
      sinon.stub(SalesModel, "getAll").resolves([mockSales]);
    });

    after(async () => {
      SalesModel.getAll.restore();
    });

    it("must return an array", async () => {
      const response = await SalesService.getAll();
      expect(response).to.be.an('array');
    });

    it("the array contains two objects", async () => {
      const [response] = await SalesService.getAll();
      expect(response).to.have.lengthOf(2);
    });
  });

  describe("When looking for a sale by id", () => {
    describe("When the id is valid", () => {
      before(async () => {
        sinon.stub(SalesModel, "getById").resolves([mockedIdSales]);
      });

      after(async () => {
        SalesModel.getById.restore();
      });

      it("must return an array", async () => {
        const response = await SalesService.getById(1);
        expect(response).to.be.an('array');
      });
    });
  });
});