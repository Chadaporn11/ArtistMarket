const express = require("express");
const router = express.Router();

//controller
const {
  listProduct,
  readProduct,
  createProduct,
  updateProduct,
  removeProduct,
  listProductBy,
  listProductByOwner,
  searchProductFilters,

} = require("../controllers/product");

// middleware
const { auth, adminCheck, sellerCheck } = require("../middleware/auth");


//@Endpoint  process.env.PORT/product
router.post("/product", auth, sellerCheck, createProduct);
// router.post("/product", createProduct);

//@Endpoint  process.env.PORT/products
router.get("/products/:count", listProduct);

//@Endpoint  process.env.PORT/product/:id
router.delete("/product/:id", auth, sellerCheck, removeProduct);

//@Endpoint  process.env.PORT/product
router.get("/product/:id", readProduct);

//@Endpoint  process.env.PORT/product/:id
router.get("/productby/:id", auth, sellerCheck, listProductByOwner);

//@Endpoint  process.env.PORT/product/:id
// router.put("/product/:id", auth, adminCheck, updateProduct);
router.put("/product/:id", auth, sellerCheck, updateProduct);

//@Endpoint  process.env.PORT/productby
router.post("/productby", listProductBy);

//search
router.post("/search/filters", searchProductFilters);



module.exports = router;