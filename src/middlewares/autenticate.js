import passport from "passport";

export const authenticate = (strategy) => {
  const passportAuthenticate = async (req, res, next) => {
    passport.authenticate(
      strategy,
      { session: false, failureRedirect: "/failure-page" },
      (err, user, info) => {
        if (err) return next(err);

        if (!user) {
          return res
            .status(400)
            .send({ status: "erro", payload: "usuario no encontrado" });
        }

        req.user = user;
        next();
      },
      (req, res, next)
    );
  };

  return passportAuthenticate;
};

export const authorize = (role) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res
        .status(401)
        .send({ status: "error", payload: "usuario no autorizado" });
    }
    if (req.user.role !== role) {
      return res
        .status(403)
        .send({ status: "error", payload: "usuario sin permiso" });
    }
    next();
  };
};
