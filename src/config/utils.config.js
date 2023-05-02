import bcryp from "bcrypt";

export const createHash = (password) => {
  const hash = bcryp.hashSync(password, bcryp.genSaltSync());
  return hash;
};

export const compareHash = (userPassword, hash) => {
  const verify = bcryp.compareSync(userPassword, hash);
  return verify;
};
