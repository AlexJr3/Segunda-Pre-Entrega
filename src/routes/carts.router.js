import { Router } from "express";
import { CartController } from "../controller/cart.controller.js";

const cartRouter = Router();
const controller = new CartController();

cartRouter.post("/", controller.createCartController);

cartRouter.get("/", controller.getCartsController);

cartRouter.get("/:cid", controller.getCartByIdController);

cartRouter.post(
  "/:cid/products/:pid",
  controller.insertProductToCartController
);

cartRouter.put("/:cid", controller.updateCartController);

cartRouter.put("/:cid/products/:pid", controller.updateCuantiyController);

cartRouter.delete("/:cid/products/:pid", controller.deletedProductController);

cartRouter.delete("/:cid", controller.deletedCartController);

export default cartRouter;
