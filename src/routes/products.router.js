import { Router, json } from "express";
import { ProductController } from "../controller/products.controller.js";

const router = Router();
const controller = new ProductController();

router.get("/", controller.getProductsController);

router.get("/:pid", controller.getProdIdController);

router.post("/", controller.createProductController);

router.put("/:pid", controller.updateProdController);

router.delete("/:pid", controller.deletedProdController);

export default router;
