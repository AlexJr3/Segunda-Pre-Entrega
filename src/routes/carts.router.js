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
    const cartUpdate = await cartManager.addProductToCart(cid, pid);

    res.status(200).send({ status: "ok", payload: cartUpdate });
  } catch (err) {
    res.status(400).send({ status: "error", payload: err.message });
  }
});

cartRouter.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const prod = await cartManager.prodDeleted(cid, pid);

  res.status(200).send({ status: "ok", payload: prod });
});

cartRouter.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  const products = req.body;

  const cart = await cartManager.updateCart(cid, products);

  res.status(200).send({ status: "ok", payload: cart });
});

cartRouter.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  const newQuantity = await cartManager.updateQuantity(cid, pid, quantity);

  res.status(200).send({ status: "ok", payload: newQuantity });
});

cartRouter.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  const deleteProduct = await cartManager.deletedAll(cid);

  res.status(200).send({ status: "ok", payload: deleteProduct });
});

export default cartRouter;
