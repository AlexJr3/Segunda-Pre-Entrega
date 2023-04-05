import express from "express";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
const app = express();

app.use(express.json());
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

app.listen(8008, (req, res) => {
  console.log("Server listening on port 8080");
});