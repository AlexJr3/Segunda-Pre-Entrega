import express from "express";
import __dirname from "./utils.js";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/view.router.js";
import { engine } from "express-handlebars";
import mongoose from "mongoose";

const app = express();

//Midlewares
app.use(express.json());
app.use(express.static(__dirname + "../public"));
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

//Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

//mongooseConnect

mongoose
  .connect(
    "mongodb+srv://alexisjrbwork:blTyiBGV3yxMhFcb@codercluster.7y4c97s.mongodb.net/Segunda-Pre-Entrega?retryWrites=true&w=majority"
  )
  .then((conn) => {
    console.log("Connected to DB");
  });

app.listen(8080, (req, res) => {
  console.log("Server listening on port 8080");
});
