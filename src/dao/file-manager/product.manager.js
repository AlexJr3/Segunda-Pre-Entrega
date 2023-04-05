import fs from "fs";
import __dirname from "../../utils.js";
import { getNextId } from "./utils.js";

const path = __dirname + "/dao/file-manager/file/Products.json";

class ProductManager {
  constructor() {
    console.log("Working with courses with FileSystem");
  }

  getProducts = async () => {
    try {
      const products = await fs.promises.readFile(path, "utf-8");
      return JSON.parse(products);
    } catch (err) {
      return [];
    }
  };

  addProduct = async ({
    title,
    description,
    price,
    thumbnails,
    code,
    stock,
    status,
    category,
  }) => {
    const products = await this.getProducts();
    const codeCheck = await products.some((el) => el.code === code);
    const verificar = Object.values(products);

    if (verificar.includes(undefined)) {
      throw new Error("Falta llenar un campo");
    } else if (codeCheck) {
      throw new Error(`ERROR!!! El codigo ${code} ya existe`);
    }

    const newProduct = {
      id: getNextId(products),
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      status,
      category,
    };

    const productsUpdate = [...products, newProduct];

    await fs.promises.writeFile(path, JSON.stringify(productsUpdate));
  };

  getProductById = async (idProduct) => {
    const products = await this.getProducts();
    const productCheck = await products.find((el) => el.id === idProduct);

    if (!productCheck) {
      throw new Error("Not found");
    } else {
      return productCheck;
    }
  };

  updateProduct = async (productId, data) => {
    const products = await this.getProducts();

    const updateProduct = await products.map((el) => {
      if (el.id === productId) {
        return {
          ...el,
          ...data,
          id: el.id,
        };
      }
      return el;
    });

    await fs.promises.writeFile(path, JSON.stringify(updateProduct));
    console.log("Producto modificado");
  };

  deleteProduct = async (idProduct) => {
    const products = await this.getProducts();
    const newProduct = await products.filter((el) => el.id !== idProduct);

    await fs.promises.writeFile(path, JSON.stringify(newProduct));
    console.log("Deleted Product");
  };
}

export default ProductManager;
