import productModel from "../models/product.model.js";

class productManager {
  constructor() {
    console.log("Working with products with DataBase");
  }

  getProducts = async (queryLimit, queryPage, querySort, query) => {
    let products;
    const getLimit = queryLimit ? queryLimit : 10;
    const getPage = queryPage ? queryPage : 1;
    const getSort = querySort ? { price: querySort } : false;

    const options = {
      page: getPage,
      limit: getLimit,
      sort: getSort,
    };

    try {
      if (!query) {
        products = await productModel.paginate({}, options);
      } else {
        products = await productModel.paginate({ ...query }, options);
      }
      return products;
    } catch (err) {
      throw new Error({ err });
    }
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
