import passport from "passport";
import jwt from "jsonwebtoken";
import { authorize, authenticate } from "../middlewares/autenticate.js";
import { config } from "../config/config.js";

const securityToken = config.jwt.key;
const nameCookieToken = "token-cookie";

export const singUpController = passport.authenticate("singUpStrategy", {
  failureRedirect: "/api/auth/failure-page",
  session: false,
});

export const loginController = passport.authenticate("loginStrategy", {
  failureRedirect: "/api/auth/failure-page",
  session: false,
});

export const currentAuthenticateController = authenticate("current");
export const currentAuthorizeController = authorize("admin");

class AuthController {
  singUpRedirectController(req, res) {
    res.redirect("/api/auth/login");
  }

  loginRedirectController(req, res) {
    const token = jwt.sign(
      { email: req.user.email, role: req.user.role },
      securityToken
    );
    res
      .cookie(nameCookieToken, token, { httpOnly: true })
      .redirect("/products");
  }

  curretController(req, res) {
    res.send(`Usuario autenticado, Bienvenido ${req.user.email}`);
  }

  failurePageController(req, res) {
    res.send({ status: "error", message: new Error() });
  }
}

export { AuthController };
