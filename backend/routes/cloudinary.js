const express = require("express");
const router = express.Router();

//controller
const {
    createImage,
    removeImage
} = require("../controllers/cloudinary");

// middleware
const { auth, adminCheck, sellerCheck } = require("../middleware/auth");

//@Endpoint  http://localhost:4200/api/images-seller
router.post("/images-seller", auth, sellerCheck, createImage);

//@Endpoint  http://localhost:4200/api/images-admin
router.post("/images-admin", auth, adminCheck, createImage);

//@Endpoint  http://localhost:4200/api/removeimages-seller
router.post("/removeimages-seller", auth, sellerCheck, removeImage);

//@Endpoint  http://localhost:5000/api/removeimages-admin
router.post("/removeimages-admin", auth, adminCheck, removeImage);




module.exports = router;