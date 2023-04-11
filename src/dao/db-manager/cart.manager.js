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
    const cart = await cartModel.findById(id).populate("products.product");

    return cart;
  }

  async addProductToCart(cartId, productId) {
    const cart = await cartModel.findById(cartId).populate("products.product");
    const productIndex = await cart.products.findIndex(
      (el) => el._id.toString() === productId.toString()
    );

    if (productIndex === -1) {
      cart.products.push({ product: productId, quantity: 1 });
    } else {
      cart.products[productIndex].quantity += 1;
    }

    return cart.save();
  }

  async deletedProduct(cId, pId) {
    const deleted = await cartModel.updateOne(
      { _id: cId },
      { $pull: { products: { product: pId } } }
    );
    return deleted;
  }

  async updateCart(cId, data) {
    const addCart = await cartModel.updateOne(
      { _id: cId },
      { $push: { products: { $each: data } } }
    );

    return addCart.save();
  }

  async updateQuantity(cid, pid, reqQuantity) {
    const cart = await cartModel.findById(cid).populate("products.product");

    const add = reqQuantity ? reqQuantity : 1;
    const productIndex = await cart.products.findIndex(
      (p) => p._id.toString() === pid.toString()
    );

    if (productIndex === -1) {
      cart.products.push({ product: pid, quantity: add });
    } else {
      cart.products[productIndex].quantity += add;
    }

    return cart.save();
  }

  async deletedAll(cId) {
    const deletedProducts = await cartModel.updateOne(
      { _id: cId },
      { $pull: { products: {} } }
    );

    return deletedProducts;
  }
}

export default CartManager;
