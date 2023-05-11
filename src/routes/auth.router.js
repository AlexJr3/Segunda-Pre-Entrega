import { Router } from "express";
import cookieParser from "cookie-parser";
import {
  AuthController,
  singUpController,
  loginController,
  currentAuthenticateController,
  currentAuthorizeController,
} from "../controller/auth.controller.js";

const router = Router();
router.use(cookieParser());
const controller = new AuthController();

router.post("/singup", singUpController, controller.singUpRedirectController);

router.post("/login", loginController, controller.loginRedirectController);

router.get(
  "/current",
  currentAuthorizeController,
  currentAuthenticateController,
  controller.curretController
);

router.get("/failure-page", controller.failurePageController);

export default router;
