const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const RequestSignupSellerSchema = new mongoose.Schema(
    {
        checkStatus: {
            type: String,
            default: 'Waiting for confirmation',
        },
        CardImage: {
            type: Array,
        },
        PersonImage: {
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
module.exports = RequestSignupSeller = mongoose.model("requestsignupsellers", RequestSignupSellerSchema);