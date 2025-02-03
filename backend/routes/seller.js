const express = require("express");
const router = express.Router();

// middleware
const { auth, sellerCheck } = require("../middleware/auth");

//controller
const {
    getOrderSeller,
    changeOrderStatus,
} = require("../controllers/seller");

//@Endpoint  process.env.PORT/api/seller/orders
router.get("/seller/orders", auth, sellerCheck, getOrderSeller);

//@Endpoint  process.env.PORT/api/seller/order-status
router.put("/seller/order-status", auth, sellerCheck, changeOrderStatus);

module.exports = router;