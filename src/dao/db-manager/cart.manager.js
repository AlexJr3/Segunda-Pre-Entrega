import cartModel from "../models/cart.model.js";

class CartManager {
  constructor() {
    console.log("Working with carts with DataBase");
  }

  getCarts = async () => {
    const carts = await cartModel.find().lean();

    return carts;
  };

  addCart = async (carts) => {
    const result = await cartModel.create(carts);

    return result;
  };

  getCartById = async (id) => {
    const cart = await cartModel.findById(id);

    return cart;
  };

  addProductToCart = async (cartId, productId) => {
    const cart = await cartModel.findById(cartId);

    cart.products.push({ productId });

    return cart.save();
  };
}

export default CartManager;
