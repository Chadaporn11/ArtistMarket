const express = require("express");
const router = express.Router();

//controller
const {
    createImage,
    removeImage
} = require("../controllers/cloudinary");

// middleware
const { auth, adminCheck, sellerCheck } = require("../middleware/auth");

//@Endpoint  process.env.PORT/images-seller
router.post("/images-seller", auth, sellerCheck, createImage);

//@Endpoint  process.env.PORT/images-admin
router.post("/images-admin", auth, adminCheck, createImage);

//@Endpoint  process.env.PORT/removeimages-seller
router.post("/removeimages-seller", auth, sellerCheck, removeImage);

//@Endpoint  http://localhost:5000/removeimages-admin
router.post("/removeimages-admin", auth, adminCheck, removeImage);

//@Endpoint  process.env.PORT/images-user
router.post("/images-user", auth, createImage);

//@Endpoint  http://localhost:5000/removeimages-user
router.post("/removeimages-user", auth, removeImage);




module.exports = router;