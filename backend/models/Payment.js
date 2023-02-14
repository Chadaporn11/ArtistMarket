const mongoose = require("mongoose");
const PaymentSchema = new mongoose.Schema(
  {
    paymentMethod: {
      type: String,
    },
    details: {
      type: String,
    }
  },
  { timestamps: true }
);
module.exports = Payment = mongoose.model("payments", PaymentSchema);