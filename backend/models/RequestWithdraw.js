const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const RequestWithdrawSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
        },
        checkStatus: {
            type: String,
            default: 'waiting for confirmation',
        },
        paymentImage: {
            type: Array,
        },
        requestType: {
            type: ObjectId,
            ref: "requesttypes",
        },
        requestBy: {
            type: ObjectId,
            ref: "users",
        },
    },
    { timestamps: true }
);
module.exports = RequestWithdraw = mongoose.model("requestwithdraws", RequestWithdrawSchema);