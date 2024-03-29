const { Router } = require("express");
const { createCartHandler } = require("../handlers/CartHandlers/createCartHandler");
const { getCartHandler } = require("../handlers/CartHandlers/getCartHandler");
const { getCartByIdHandler } = require("../handlers/CartHandlers/getCartByIdHandler");
const { getCartByUserIdHandler } = require("../handlers/CartHandlers/getCartByUserIdHandler");
const { updateCartHandler } = require("../handlers/CartHandlers/updateCartHandler");
const { mpCartHandler } = require ("../handlers/MercadoPagoHandlers/mpCartHandler");
const { deleteCartHandler } = require("../handlers/CartHandlers/deleteCartHandler");

const cartRouter = Router();

cartRouter.get("/", getCartHandler);
cartRouter.get("/:cartId", getCartByIdHandler);
cartRouter.post("/", createCartHandler);
cartRouter.put("/:cartId", updateCartHandler);
cartRouter.get("/user/:userId", getCartByUserIdHandler);
cartRouter.delete("/:cartId", deleteCartHandler)
cartRouter.post("/create_preference", mpCartHandler);
// cartRouter.get("/:userId", getCartByUserIdHandler); // Falta controller

module.exports = cartRouter;
