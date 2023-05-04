import bcryp from "bcrypt";

export const createHash = (password) => {
  const hash = bcryp.hashSync(password, bcryp.genSaltSync());
  return hash;
};

export const compareHash = (userPassword, user) => {
  const verify = bcryp.compareSync(userPassword, user.password);
  return verify;
};

export const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies("token-cookie");
  }
  return token;
};
