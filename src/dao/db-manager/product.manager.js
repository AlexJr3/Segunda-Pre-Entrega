import productModel from "../models/product.model.js";

class productManager {
  constructor() {
    console.log("Working with products with DataBase");
  }

  getProducts = async () => {
    const products = await productModel.find().lean();

    return products;
  };

  addProduct = async (product) => {
    const result = await productModel.create(product);

    return result;
  };

  getProductById = async (productId) => {
    const product = await productModel.findById(productId);

    return product;
  };

  updateProduct = async (productId, data) => {
    const product = await productModel.findByIdAndUpdate(productId, data, {
      new: true,
    });

    return product.save();
  };

  deleteProduct = async (productId) => {
    const product = await productModel.findByIdAndDelete(productId);

    return product.save();
  };
}

export default productManager;
