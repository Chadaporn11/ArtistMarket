const express = require("express");
const router = express.Router();

//controller
const {
    getOrderAdmin,
    changeOrderStatus,
} = require("../controllers/admin");

// middleware
const { auth, adminCheck } = require("../middleware/auth");

//@Endpoint  http://localhost:4200/api/admin/orders
router.get("/admin/orders", auth, adminCheck, getOrderAdmin);

//@Endpoint  http://localhost:4200/api/user/order-status
router.put("/admin/order-status", auth, adminCheck, changeOrderStatus);

module.exports = router;