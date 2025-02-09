const express = require("express");
const router = express.Router();

//controller
const {
  register,
  registerSeller,
  login,
  currentUser
} = require("../controllers/auth");
const {
  createWallet
} = require("../controllers/wallet");

// middleware
const { auth, adminCheck, sellerCheck } = require("../middleware/auth");

//@Endpoint  process.env.PORT/register
router.post("/register", register, createWallet);

//@Endpoint  process.env.PORT/register-seller
router.post("/register-seller", registerSeller, createWallet);

//@Endpoint  process.env.PORT/login
router.post("/login", login);

//@Endpoint  process.env.PORT/current-user
router.post("/current-user", auth, currentUser);

//@Endpoint  process.env.PORT/current-seller
router.post("/current-seller", auth, sellerCheck, currentUser);

//@Endpoint  process.env.PORT/current-admin
router.post("/current-admin", auth, adminCheck, currentUser);

module.exports = router;