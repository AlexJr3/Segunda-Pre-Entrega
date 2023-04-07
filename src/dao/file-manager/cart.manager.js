import fs from "fs";
import __dirname from "../../utils.js";
import { getNextId } from "./utils.js";

const path = __dirname + "/dao/file-manager/file/Cart.json";

class CartManager {
  constructor() {
    console.log("Working with carts with FileSystem");
  }

  getCarts = async () => {
    try {
      const carts = await fs.promises.readFile(path, "utf-8");
      return JSON.parse(carts);
    } catch (error) {
      return [];
    }
  };

  addCart = async () => {
    try {
      const carts = await this.getCarts();
      const newCart = { id: getNextId(carts), products: [] };
      const updateCart = [...carts, newCart];

      await fs.promises.writeFile(path, JSON.stringify(updateCart));
      console.log("New cart created");
    } catch (error) {
      throw new Error(error);
    }
  };

  getCartById = async (id) => {
    const carts = await this.getCarts();
    const cartCheck = await carts.find((el) => el.id === id);

    if (!cartCheck) {
      throw new Error("Not Found");
    } else {
      return cartCheck;
    }
  };

  addProductToCart = async (idCart, idProduct) => {
    const carts = await this.getCarts();
    const cartIndex = await carts.findIndex((el) => el.id === idCart);

    if (cartIndex === -1) {
      throw new Error("Not found");
    }

    const cart = carts[cartIndex];
    const productIndex = cart.products.findIndex((el) => el.id === idProduct);

    if (productIndex === -1) {
      cart.products.push({ id: idProduct, quantity: 1 });
    } else {
      cart.products[productIndex].quantity += 1;
    }

    carts[cartIndex] = cart;

    await fs.promises.writeFile(path, JSON.stringify(carts));

    console.log("Producto agregado al carrito");
  };
}

export default CartManager;
