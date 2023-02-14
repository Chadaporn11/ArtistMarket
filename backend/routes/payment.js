const express = require("express");
const router = express.Router();

//controller
const {
    createPayment,
    updatePayment,
    readPayment,
} = require("../controllers/payment");

// middleware
const { auth, adminCheck, sellerCheck } = require("../middleware/auth");

//@Endpoint  http://localhost:4200/api/payment-admin
router.post("/payment-admin", auth, adminCheck, createPayment);

//@Endpoint  http://localhost:4200/api/payment-seller
router.post("/payment-seller", auth, sellerCheck, createPayment);

//@Endpoint  http://localhost:4200/api/payment/:id
router.put("/payment/:id", auth, adminCheck, updatePayment);

//@Endpoint  http://localhost:4200/api/payment/:id
router.put("/payment/:id", auth, sellerCheck, updatePayment);

//@Endpoint  http://localhost:4200/api/payment/:id
router.get("/payment/:id", auth, readPayment);

module.exports = router;