import { CartManager } from "../dao/index.js";

const cartManager = new CartManager();

class CartController {
  async createCartController() {
    try {
      const { data } = req.body;
      const carts = await cartManager.addCart(data);

      res.status(200).send({ status: "ok", payload: carts });
    } catch (error) {
      res.status(400).send({ status: "error", payload: error.message });
    }
  }

  async getCartsController(req, res) {
    try {
      const cart = await cartManager.getCarts();

      res.status(200).send({ status: "ok", payload: cart });
    } catch (error) {
      res.status(400).send({ statuis: "error", payload: error.message });
    }
  }

  async getCartByIdController(req, res) {
    try {
      const { cid } = req.params;
      const cart = await cartManager.getCartById(cid);

      res.status(201).send({ status: "ok", payload: cart });
    } catch (error) {
      res.status(400).send({ status: "error", payload: error.message });
    }
  }

  async insertProductToCartController(req, res) {
    try {
      const { cid, pid } = req.params;
      const cartUpdate = await cartManager.addProductToCart(cid, pid);

      res.status(200).send({ status: "ok", payload: cartUpdate });
    } catch (err) {
      res.status(400).send({ status: "error", payload: err.message });
    }
  }

  async updateCartController(req, res) {
    try {
      const { cid } = req.params;
      const data = req.body;

      const cart = await cartManager.updateCart(cid, data);
      res.status(200).send({ status: "ok", payload: cart });
    } catch (error) {
      res.status(400).send({ status: "error", payload: error.message });
    }
  }

  async updateCuantiyController(req, res) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;

      const newQuantity = await cartManager.updateQuantity(cid, pid, quantity);

      res.status(200).send({ status: "ok", payload: newQuantity });
    } catch (error) {
      res.status(400).send({ status: "error", payload: error.message });
    }
  }

  async deletedProductController(req, res) {
    try {
      const { cid, pid } = req.params;
      const prod = await cartManager.deletedProduct(cid, pid);

      res.status(200).send({ status: "ok", payload: prod });
    } catch (error) {
      res.status(400).send({ status: "error", payload: error.message });
    }
  }

  async deletedCartController(req, res) {
    const { cid } = req.params;
    const deleteProduct = await cartManager.deletedAll(cid);

    res.status(200).send({ status: "ok", payload: deleteProduct });
  }
}

export { CartController };
