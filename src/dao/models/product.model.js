import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnails: { type: Array, default: [] },
  code: { type: String, required: true },
  stock: { type: Number, required: true },
  status: Boolean,
  category: { type: String, required: true },
});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model("products", productSchema);

export default productModel;
