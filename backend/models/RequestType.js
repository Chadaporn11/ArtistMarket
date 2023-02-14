const mongoose = require("mongoose");
const RequestTypeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
    },
    { timestamps: true }
);
module.exports = RequestType = mongoose.model("requesttypes", RequestTypeSchema);