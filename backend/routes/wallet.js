const express = require("express");
const router = express.Router();

//controller
const {
  readWallet,
  readWalletById,
} = require("../controllers/wallet");

// middleware
const { auth, adminCheck, sellerCheck } = require("../middleware/auth");

//@Endpoint  http://localhost:4200/api/wallet/:id
router.get("/wallets/:id", auth, readWalletById);




module.exports = router;