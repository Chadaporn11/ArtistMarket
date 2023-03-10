const express = require("express");
const router = express.Router();

//controller
const {
  listCategory,
  readCategory,
  createCategory,
  updateCategory,
  removeCategory,
} = require("../controllers/category");

// middleware
const { auth, adminCheck } = require("../middleware/auth");

//@Endpoint  http://localhost:4200/api/category
// router.get("/category", auth, listCategory);
router.get("/category", listCategory);

//@Endpoint  http://localhost:4200/api/category
router.post("/category", auth, adminCheck, createCategory);

//@Endpoint  http://localhost:4200/api/category/:id
router.get("/category/:id", readCategory);

//@Endpoint  http://localhost:4200/api/category/:id
// router.put("/category/:id", auth, adminCheck, updateCategory);
router.put("/category/:id", auth, adminCheck, updateCategory);

//@Endpoint  http://localhost:4200/api/category/:id
router.delete("/category/:id", auth, adminCheck, removeCategory);


module.exports = router;