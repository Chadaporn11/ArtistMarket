const express = require("express");
const router = express.Router();

//controller
const {
  listUsers,
  removeUsers,
  changeRole,
  updateUsers,
  userCart,
  getUserCart,
  emptyCart,
  saveAddressOrder,
  removeAddressOrder,
  getAddressOrder,
  saveOrder,
  getOrder,
  getOrderSeller,
  updateOrderStatus,
  updateDeliveryStatus,
  getOrderStatus,
  addToWishlist,
  getWishlist,
  removeWishlist
} = require("../controllers/users");

// middleware
const { auth, adminCheck, sellerCheck } = require("../middleware/auth");

//=======User========//

//@Endpoint  process.env.PORT/users
router.get("/users", auth, adminCheck, listUsers);

//@Endpoint  process.env.PORT/users/:id
router.delete("/users/:id", auth, adminCheck, removeUsers);

//@Endpoint  process.env.PORT/change-role
router.post("/change-role", auth, adminCheck, changeRole);

//@Endpoint  http://localhost:5000/users/:id
router.put("/users/:id", auth, adminCheck, updateUsers);
//=======User========//


//=======Cart========//

//@Endpoint  process.env.PORT/user/cart
router.post("/user/cart", auth, userCart);

//@Endpoint  process.env.PORT/user/cart
router.get("/user/cart", auth, getUserCart);

//@Endpoint  process.env.PORT/user/cart
router.delete("/user/cart", auth, emptyCart);
//=======Cart========//


//=======AddressOrder========//
//@Endpoint  process.env.PORT/user/address-order
router.post("/user/address-order", auth, saveAddressOrder);

//@Endpoint  process.env.PORT/user/address-order/:id
router.delete("/user/address-order/:id", auth, removeAddressOrder);

//@Endpoint  process.env.PORT/user/address-order
router.get("/user/address-order", auth, getAddressOrder);
//=======AddressOrder========//

//=======Order========//
//@Endpoint  process.env.PORT/user/order
router.post("/user/order", auth, saveOrder);

//@Endpoint  process.env.PORT/user/order
router.get("/user/order", auth, getOrder);

//@Endpoint  process.env.PORT/seller/order:status
router.get("/seller/order/:status", auth, getOrderSeller);

//@Endpoint  process.env.PORT/user/order
router.get("/user/order/:status", auth, getOrderStatus);

//@Endpoint  process.env.PORT/user/order
router.put("/user/order/:id", auth, updateOrderStatus);

//@Endpoint  process.env.PORT/user/order
router.put("/user/order-delivery/:id", auth, sellerCheck, updateDeliveryStatus);

//=======Order========//

//=======Wishlist========//

//@Endpoint  process.env.PORT/user/wishlist
router.post("/user/wishlist", auth, addToWishlist);

//@Endpoint  process.env.PORT/user/wishlist
router.get("/user/wishlist", auth, getWishlist);

//@Endpoint  process.env.PORT/user/wishlist/:productId
router.put("/user/wishlist/:productId", auth, removeWishlist);

//=======Wishlist========//



module.exports = router;