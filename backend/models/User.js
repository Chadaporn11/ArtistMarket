const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    wishlist: [{
      type: ObjectId,
      ref: 'products'
    }],
    walletUser: {
      type: ObjectId,
      ref: 'wallets'
    },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("users", UserSchema);