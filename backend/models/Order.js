const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const OrderSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: ObjectId,
                    ref: 'products'
                },
                owner: {
                    type: ObjectId,
                    ref: 'users'
                },
                parcelNum: Number,
                count: Number,
                price: Number,
            },

        ],
        cartTotal: Number,
        orderStatus: {
            type: String,
            default: 'Waiting for the pack'
        },
        orderBy: {
            type: ObjectId,
            ref: 'users'
        },
        addressOrder: {
            type: ObjectId,
            ref: 'addressorders',
        },
        delivery: {
            deliveryName: String,
            parcelNumber: String,
            deliveryTime: String,
        }
    },
    { timestamps: true }
);
module.exports = Order = mongoose.model("orders", OrderSchema);
