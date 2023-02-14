const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const WalletSchema = new mongoose.Schema(
    {
        walletName: {
            type: String,
        },
        password: {
            type: String,
        },
        pocketmoney: {
            type: Number,
            default: 0,
        },
        owner: {
            type: ObjectId,
            ref: 'users',
        }
    },
    { timestamps: true }
);
module.exports = Wallet = mongoose.model("wallets", WalletSchema);