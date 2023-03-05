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


//@Endpoint  http://localhost:4200/api/product
router.post("/product", auth, sellerCheck, createProduct);
// router.post("/product", createProduct);

//@Endpoint  http://localhost:4200/api/products
router.get("/products/:count", listProduct);

//@Endpoint  http://localhost:4200/api/product/:id
router.delete("/product/:id", auth, sellerCheck, removeProduct);

//@Endpoint  http://localhost:4200/api/product
router.get("/product/:id", readProduct);

//@Endpoint  http://localhost:4200/api/product/:id
router.get("/productby/:id", auth, sellerCheck, listProductByOwner);

//@Endpoint  http://localhost:4200/api/product/:id
// router.put("/product/:id", auth, adminCheck, updateProduct);
router.put("/product/:id", auth, sellerCheck, updateProduct);

//@Endpoint  http://localhost:4200/api/productby
router.post("/productby", listProductBy);

//search
router.post("/search/filters", searchProductFilters);



module.exports = router;