const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const PaymentMethodSchema = new mongoose.Schema(
    {
        paymentmethod: {
            type: String,
        },
        accountnumber: {
            type: String,
        },
        accountname: {
            type: String,
        },
        qrcode: {
            type: Array,
        },
        owner: {
            type: ObjectId,
            ref: "users",
        },
    },
    { timestamps: true }
);
module.exports = PaymentMethod = mongoose.model("paymentmethods", PaymentMethodSchema);