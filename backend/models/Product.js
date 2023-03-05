const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      text: true,
    },
    description: {
      type: String,
    },
    category: {
      type: ObjectId,
      ref: "category"
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    productStatus: {
      type: String,
      default: 'sell',
    },
    productImages: {
      type: Array,
    },
    owner: {
      type: ObjectId,
      ref: "users"
    }
  },
  { timestamps: true }
);
module.exports = Product = mongoose.model("products", ProductSchema);