import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const JWT_KEY = process.env.JWT_KEY;

export const config = {
  server: {
    dbUrl: MONGO_URL,
    port: PORT,
  },
  jwt: {
    key: JWT_KEY,
  },
};
