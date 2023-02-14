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

//@Endpoint  http://localhost:4200/api/register
router.post("/register", register, createWallet);

//@Endpoint  http://localhost:4200/api/register-seller
router.post("/register-seller", registerSeller, createWallet);

//@Endpoint  http://localhost:4200/api/login
router.post("/login", login);

//@Endpoint  http://localhost:4200/api/current-user
router.post("/current-user", auth, currentUser);

//@Endpoint  http://localhost:4200/api/current-seller
router.post("/current-seller", auth, sellerCheck, currentUser);

//@Endpoint  http://localhost:4200/api/current-admin
router.post("/current-admin", auth, adminCheck, currentUser);

module.exports = router;