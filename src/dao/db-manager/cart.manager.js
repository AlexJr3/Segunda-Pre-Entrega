import cartModel from "../models/cart.model.js";

class CartManager {
  constructor() {
    console.log("Working with carts with DataBase");
  }

  async getCarts() {
    const carts = await cartModel.find().lean().populate("products.product");

    return carts;
  }

  async addCart(data) {
    try {
      const result = await cartModel.create(data);

      return result;
    } catch (error) {
      return [];
    }
  }

  async getCartById(id) {
    const cart = await cartModel
      .findById(id)
      .lean()
      .populate("products.product");

    return cart;
  }

  async addProductToCart(cartId, productId) {
    try {
      const cart = await cartModel.findById(cartId);
      const findProduct = await cart.products.find(
        (el) => el.product.toString() === productId
      );

      if (!findProduct) {
        cart.products.push({ product: productId });
      } else {
        findProduct.quantity += 1;
      }

      return cart.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async deletedProduct(cId, pId) {
    const deleted = await cartModel.updateOne(
      { _id: cId },
      { $pull: { products: { product: pId } } }
    );
    return deleted;
  }

  async updateCart(cid, data) {
    try {
      const cartUpdate = await cartModel.findOneAndUpdate(
        { _id: cid },
        { $set: { products: data } },
        { new: true }
      );

      return cartUpdate;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateQuantity(cid, pid, reqQuantity) {
    try {
      const cart = await cartModel.findById(cid);
      const add = reqQuantity ? reqQuantity : 1;
      const findProduct = await cart.products.find(
        (p) => p.product.toString() === pid
      );

      if (!cart) {
        throw new Error("No existe el carrito");
      }

      if (findProduct) {
        findProduct.quantity += add;
      } else {
        cart.products.push({ product: pid, quantity: add });
      }

      await cart.save();
      await cart.populate("products.product");

      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deletedAll(cId) {
    const cart = await cartModel.findById(cId);

    cart.products = [];

    return cart.save();
  }
}

export default CartManager;
