import { Router } from "express";
import { CartManager } from "../dao/index.js";
import { ProductManager } from "../dao/index.js";

const cartRouter = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();

cartRouter.use(json());

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

export default cartRouter;
