import { ProductManager } from "../dao/index.js";
import { hasNextAndPrevPage } from "../utils.js";

const productManager = new ProductManager();

class ProductController {
  async getProductsController(req, res) {
    try {
      const { limit, page, sort, query } = req.query;
      const products = await productManager.getProducts(
        limit,
        page,
        sort,
        query
      );

      hasNextAndPrevPage(products);

      res.status(200).send({ status: "ok", payload: products });
    } catch (err) {
      res.status(400).send({ status: "error", payload: err.message });
    }
  }

  async getProdIdController(req, res) {
    try {
      const { pid } = req.params;
      const product = await productManager.getProductById(pid);
      res.status(200).send({ status: "ok", payload: product });
    } catch (err) {
      res.status(400).send({ status: "error", payload: err.message });
    }
  }

  async createProductController(req, res) {
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

      const newProduct = await productManager.addProduct(
        title,
        description,
        price,
        thumbnails,
        code,
        stock,
        status,
        category
      );

      res.status(201).send({ status: "ok", payload: newProduct });
    } catch (err) {
      res.status(400).send({ status: "ok", payload: err.message });
    }
  }

  async updateProdController(req, res) {
    try {
      const { pid } = req.params;
      const data = req.body;
      const product = await productManager.getProductById(pid);
      await productManager.updateProduct(pid, data);

      res.status(200).send({
        status: "ok",
        payload: product,
      });
    } catch (err) {
      res.status(400).send({ status: "error", payload: err.message });
    }
  }

  async deletedProdController(req, res) {
    try {
      const { pid } = req.params;
      await productManager.deleteProduct(pid);

      res.status(202).send({ status: "ok", payload: "Product Deleted" });
    } catch (err) {
      res.status(400).send({ status: "error", payload: err.message });
    }
  }
}

export { ProductController };
