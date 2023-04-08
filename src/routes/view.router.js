import { Router } from "express";
import { ProductManager, CartManager } from "../dao/index.js";
import cartModel from "../dao/models/cart.model.js";
import productModel from "../dao/models/product.model.js";

const router = Router();

router.get("/products", async (req, res) => {});

export default router;
