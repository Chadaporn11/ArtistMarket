const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const RequestTopUpSchema = new mongoose.Schema(
    {
        paymentname: {
            type: String,
        },
        topupAmount: {
            type: Number,
        },
        topupTime: {
            type: String,
        },
        checkStatus: {
            type: String,
            default: 'Waiting for confirmation',
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
module.exports = RequestTopUp = mongoose.model("requesttopups", RequestTopUpSchema);