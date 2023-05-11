import passport from "passport";
import localStrategy from "passport-local";
import jwt from "passport-jwt";
import { userModel } from "../dao/models/user.model.js";
import { createHash, compareHash, cookieExtractor } from "./utils.config.js";
import { config } from "./config.js";

const securityToken = config.jwt.key;
const jwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

export const localPassport = () => {
  passport.use(
    "singUpStrategy",
    new localStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const { firstName, lastName, age } = req.body;
          const user = await userModel.findOne({ email: username });
          if (user) {
            return done(null, false);
          }

          if (!user) {
            const newUser = {
              firstName,
              lastName,
              age,
              email: username,
              password: createHash(password),
            };

            const createdUser = await userModel.create(newUser);

            return done(null, createdUser);
          }
        } catch (error) {
          return done({ message: error.message });
        }
      }
    )
  );

  //login strategy
  passport.use(
    "loginStrategy",
    new localStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (!user) {
            return done(null, false);
          }

          if (!compareHash(password, user)) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  ///jwtStrategy

  const strategyjwt = () => {
    passport.use(
      "current",
      new jwtStrategy(
        {
          jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
          secretOrKey: securityToken,
        },
        async (jwt_payload, done) => {
          try {
            return done(null, jwt_payload);
          } catch (error) {
            return done(error);
          }
        }
      )
    );
  };

  //Serializar el passport
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    return done(null, user);
  });
};
