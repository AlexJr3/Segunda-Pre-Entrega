import { Router, json } from "express";
import { ProductManager } from "../dao/index.js";

const router = new Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const { limit, page, sort, query } = req.query;
    const products = await productManager.getProducts(limit, page, sort, query);

    res.status(200).send({ status: "ok", payload: products });
  } catch (error) {
    res.status(400).send({ status: "error", payload: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const productId = await productManager.getProductById(pid);

    res.status(200).send({ status: "ok", payload: productId });
  } catch (error) {
    res.status(400).send({ status: "error", payload: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      status = true,
      category,
    } = req.body;

    const newProduct = await productManager.addProduct({
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      status,
      category,
    });

    res.status(201).send({ status: "ok", payload: newProduct });
  } catch (err) {
    res.status(400).send({ status: "ok", payload: err.message });
  }

  router.put("/:pid", async (req, res) => {
    try {
      const { pid } = req.query;
      const data = req.body;
      await productManager.updateProduct(pid, ...data);

      res
        .status(200)
        .send({ status: "ok", payload: productManager.getProductById(pid) });
    } catch (err) {
      res.status(400).send({ status: "error", payload: err.message });
    }
  });

  router.delete("/:pid", async (req, res) => {
    try {
      const { pid } = req.query;
      await productManager.deleteProduct(pid);

      res.status(202).send({ status: "ok", payload: "Product Deleted" });
    } catch (err) {
      res.status(400).send({ status: "error", payload: err.message });
    }
  });
});

export default router;
