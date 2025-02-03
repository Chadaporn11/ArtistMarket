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

//@Endpoint  process.env.PORT/payment-admin
router.post("/payment-admin", auth, adminCheck, createPayment);

//@Endpoint  process.env.PORT/payment-seller
router.post("/payment-seller", auth, sellerCheck, createPayment);

//@Endpoint  process.env.PORT/payment/:id
router.put("/payment/:id", auth, adminCheck, updatePayment);

//@Endpoint  process.env.PORT/payment/:id
router.put("/payment-seller/:id", auth, sellerCheck, updatePayment);

//@Endpoint  process.env.PORT/payment/:id
router.get("/payment/:id", auth, readPayment);

module.exports = router;