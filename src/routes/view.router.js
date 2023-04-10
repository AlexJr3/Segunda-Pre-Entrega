import { Router } from "express";
import { ProductManager, CartManager } from "../dao/index.js";
import cartModel from "../dao/models/cart.model.js";
import productModel from "../dao/models/product.model.js";

const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

router.get("/products", async (req, res) => {
  const { page } = req.query;
  const products = await productModel.paginate(
    {},
    { limit: 5, lean: true, page: page ?? 1 }
  );

  console.log(products.docs);

  res.render("products", { products });
});

export default router;

/* 
    ANTES DE EMPEZAR CON LAS VISTAS TENEMOS QUE HACER LAS PRUEBAS DE LOS ENDPOINTS.
*/
