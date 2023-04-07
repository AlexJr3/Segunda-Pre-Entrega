import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartSchema = mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: Number,
      },
    ],
    default: [],
  },
});

cartSchema.plugin(mongoosePaginate);

const cartModel = mongoose.model("carts", cartSchema);

export default cartModel;
