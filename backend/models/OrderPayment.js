const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const OrderPaymentSchema = new mongoose.Schema(
    {
        payment: {
            type: ObjectId,
            ref: 'payments'
        },
        orderStatus: {
            type: String,
            default: 'wait for confirmed!'
        },
        orderBy: {
            type: ObjectId,
            ref: 'users'
        }
    },
    { timestamps: true }
);
module.exports = OrderPayment = mongoose.model("orderpayments", OrderPaymentSchema);
