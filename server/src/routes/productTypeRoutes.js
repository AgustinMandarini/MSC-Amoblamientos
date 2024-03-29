const { Router } = require("express");
const {
  getProductTypeHandler,
} = require("../handlers/ProductTypeHandlers/getProductTypeHandler");
const {
  createProductTypeHandler,
} = require("../handlers/ProductTypeHandlers/createProductTypeHandler");
const {
  deleteProductTypeHandler,
} = require("../handlers/ProductTypeHandlers/deleteProductTypeHandler");
const {
  getProductTypeByIdHandler,
} = require("../handlers/ProductTypeHandlers/getProductTypeByIdHandler");

const productTypeRouter = Router();

productTypeRouter.get("", getProductTypeHandler);
productTypeRouter.post("", createProductTypeHandler);
productTypeRouter.delete("/:productTypeId", deleteProductTypeHandler);
productTypeRouter.get("/:productTypeId", getProductTypeByIdHandler);

module.exports = productTypeRouter;
