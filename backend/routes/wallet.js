const express = require("express");
const router = express.Router();

//controller
const {
  readWallet,
  readWalletById,
} = require("../controllers/wallet");

// middleware
const { auth, adminCheck, sellerCheck } = require("../middleware/auth");

//@Endpoint  process.env.PORT/wallet/:id
router.get("/wallets/:id", auth, readWalletById);




module.exports = router;