import { Router } from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = Router();
router.use(cookieParser());
const securityToken = "claveSuperSegura";

router.post(
  "/singup",
  passport.authenticate("singUpStrategy", { session: false }),
  (req, res) => {
    res.send("Registrado con exito");
  }
);

router.post(
  "/login",
  passport.authenticate("loginStrategy", {
    session: false,
    failureRedirect: "/failure-login",
  }),
  (req, res) => {
    const token = jwt.sign(
      { email: req.user.email, role: req.user.role },
      securityToken
    );
    res.cookie("token-cookie", token, { httpOnly: true }).redirect("/products");
  }
);

router.get("/failure-login", (req, res) => {
  res.send({ status: "error", message: new Error() });
});

export default router;
