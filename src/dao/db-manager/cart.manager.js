import cartModel from "../models/cart.model.js";

class CartManager {
  constructor() {
    console.log("Working with carts with DataBase");
  }

  async getCarts() {
    const carts = await cartModel.find().lean();

    return carts;
  }

  async addCart(carts) {
    const result = await cartModel.create(carts);

    return result;
  }

  async getCartById(id) {
    const cart = await cartModel.findById(id);

    return cart;
  }

  async addProductToCart(cartId, productId) {
    const cart = await cartModel.findById(cartId);

    cart.products.push({ productId });

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

    return addCart;
  }
}

export default CartManager;
