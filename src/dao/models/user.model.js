import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  age: Number,
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  cart: String,
});

export const userModel = mongoose.model("users", userSchema);
