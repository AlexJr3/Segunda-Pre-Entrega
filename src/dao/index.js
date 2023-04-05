import FileProductManager from "./file-manager/product.manager.js";
import FileCartManager from "./file-manager/cart.manager.js";
import DbProductManager from "./db-manager/product.manager.js";
import DbCartManager from "./db-manager/cart.manager.js";

const config = {
  persintenceType: "db",
};

let ProductManager, CartManager;

if (config.persintenceType === "db") {
  ProductManager = DbProductManager;
  CartManager = DbCartManager;
} else if (config.persintenceType === "file") {
  ProductManager = FileProductManager;
  CartManager = FileCartManager;
} else {
  throw new Error("Unknow persitance type");
}

export { ProductManager, CartManager };
