import { Router } from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import jwt from "jsonwebtoken";
import { authorize, authenticate } from "../middlewares/autenticate.js";

const router = Router();
router.use(cookieParser());
const securityToken = "claveSuperSegura";

router.post("/singup", authenticate("singUpStrategy"), (req, res) => {
  res.send("Registrado con exito");
});

router.post("/login", authenticate("loginStrategy"), (req, res) => {
  const token = jwt.sign(
    { email: req.user.email, role: req.user.role },
    securityToken
  );
  res.cookie("token-cookie", token, { httpOnly: true }).redirect("/products");
});

router.get("/failure-page", (req, res) => {
  res.send({ status: "error", message: new Error() });
});

router.get("/current", authorize("admin"), (req, res) => {
  res.send("usuario autenticado, bienvenido", req.user.email);
});

export default router;
