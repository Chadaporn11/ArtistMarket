const express = require("express");
const router = express.Router();

// middleware
const { auth, sellerCheck } = require("../middleware/auth");

//controller
const {
    getOrderSeller,
    changeOrderStatus,
} = require("../controllers/seller");

//@Endpoint  http://localhost:4200/api/seller/orders
router.get("/seller/orders", auth, sellerCheck, getOrderSeller);

//@Endpoint  http://localhost:4200/api/seller/order-status
router.put("/seller/order-status", auth, sellerCheck, changeOrderStatus);

module.exports = router;