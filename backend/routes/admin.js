const express = require("express");
const router = express.Router();

//controller
const {
    getOrderAdmin,
    changeOrderStatus,
} = require("../controllers/admin");

// middleware
const { auth, adminCheck } = require("../middleware/auth");

//@Endpoint  process.env.PORT/admin/orders
router.get("/admin/orders", auth, adminCheck, getOrderAdmin);

//@Endpoint  process.env.PORT/user/order-status
router.put("/admin/order-status", auth, adminCheck, changeOrderStatus);

module.exports = router;