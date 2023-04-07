import { Router } from "express";
import { CartManager } from "../dao/index.js";
import { ProductManager } from "../dao/index.js";

const cartRouter = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();

cartRouter.post("/", async (req, res) => {
  try {
    const carts = await cartManager.getCarts();

    res.status(200).send({ status: "ok", payload: carts });
  } catch (error) {
    res.status(400).send({ status: "error", payload: error.message });
  }
});

cartRouter.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.query;
    const cart = await cartManager.getCartById(cid);

    res.status(201).send({ status: "ok", payload: cart });
  } catch (error) {
    res.status(400).send({ status: "error", payload: error.message });
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.query;
    const product = await productManager.getProductById(pid);
    await cartManager.addProductToCart(cid, product.id);

    res
      .status(200)
      .send({ status: "ok", payload: cartManager.getCartById(cid) });
  } catch (err) {
    res.status(400).send({ status: "error", payload: err.message });
  }
});

cartRouter.delete("/:cId/products/:pId", async (req, res) => {
  const { cId, pId } = req.params;
  const prod = await cartManager.prodDeleted(cId, pId);

  res.status(200).send({ status: "ok", payload: prod });
});

cartRouter.put("/carts/:cId", async (req, res) => {
  const { cId } = req.params;
  const { products } = req.body;

  const cart = await cartManager.updateCart(cId, products);

  res.status(200).send({ status: "ok", payload: cart });
});

export default cartRouter;
