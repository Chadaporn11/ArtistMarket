const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const AddressOrderSchema = new mongoose.Schema(
    {
        orderBy: {
            type: ObjectId,
            ref: 'users'
        },
        sendOrder: {
            name: String,
            phone: String,
            address: String,
        },
    },
    { timestamps: true }
);
module.exports = AddressOrder = mongoose.model("addressorders", AddressOrderSchema);