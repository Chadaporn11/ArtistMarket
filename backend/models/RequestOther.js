const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const RequestOtherSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        checkStatus: {
            type: String,
            default: 'Waiting for check',
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
module.exports = RequestOther = mongoose.model("requestothers", RequestOtherSchema);