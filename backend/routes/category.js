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

//@Endpoint  process.env.PORT/api/category
// router.get("/category", auth, listCategory);
router.get("/category", listCategory);

//@Endpoint  process.env.PORT/api/category
router.post("/category", auth, adminCheck, createCategory);

//@Endpoint  process.env.PORT/api/category/:id
router.get("/category/:id", readCategory);

//@Endpoint  process.env.PORT/api/category/:id
// router.put("/category/:id", auth, adminCheck, updateCategory);
router.put("/category/:id", auth, adminCheck, updateCategory);

//@Endpoint  process.env.PORT/api/category/:id
router.delete("/category/:id", auth, adminCheck, removeCategory);


module.exports = router;