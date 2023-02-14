const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const CartSchema = new mongoose.Schema(
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
                count: Number,
                price: Number,
            },

        ],
        cartTotal: Number,
        orderBy: {
            type: ObjectId,
            ref: 'users'
        }
    },
    { timestamps: true }
);
module.exports = Cart = mongoose.model("carts", CartSchema);