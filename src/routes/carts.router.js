import { Router } from "express";
import { CartManager } from "../dao/index.js";
import { ProductManager } from "../dao/index.js";

const cartRouter = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();

cartRouter.post("/", async (req, res) => {
  try {
    const { data } = req.body;
    const carts = await cartManager.addCart(data);

    res.status(200).send({ status: "ok", payload: carts });
  } catch (error) {
    res.status(400).send({ status: "error", payload: error.message });
  }
});

cartRouter.get("/", async (req, res) => {
  const cart = await cartManager.getCarts();

  res.status(200).send({ status: "ok", payload: cart });
});

cartRouter.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);

    res.status(201).send({ status: "ok", payload: cart });
  } catch (error) {
    res.status(400).send({ status: "error", payload: error.message });
  }
});

cartRouter.post("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    await cartManager.addProductToCart(cid, pid);

    res
      .status(200)
      .send({ status: "ok", payload: await cartManager.getCartById(cid) });
  } catch (err) {
    res.status(400).send({ status: "error", payload: err.message });
  }
});

cartRouter.delete("/:cId/products/:pId", async (req, res) => {
  const { cId, pId } = req.params;
  const prod = await cartManager.prodDeleted(cId, pId);

  res.status(200).send({ status: "ok", payload: prod });
});

cartRouter.put("/:cId", async (req, res) => {
  const { cId } = req.params;
  const { products } = req.body;

  const cart = await cartManager.updateCart(cId, products);

  res.status(200).send({ status: "ok", payload: cart });
});

cartRouter.put("/:cId/products/:pId", async (req, res) => {
  const { cId, pId } = req.params;
  const { quantity } = req.body;

  const newQuantity = await cartManager.updateQuantity(cId, pId, quantity);

  res.status(200).send({ status: "ok", payload: newQuantity });
});

cartRouter.delete("/:cId", async (req, res) => {
  const { cId } = req.params;
  const deleteProduct = await cartManager.deletedAll(cId);

  res.status(200).send({ status: "ok", payload: deleteProduct });
});

export default cartRouter;
