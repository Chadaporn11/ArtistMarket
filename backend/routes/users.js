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

//@Endpoint  http://localhost:4200/api/users
router.get("/users", auth, adminCheck, listUsers);

//@Endpoint  http://localhost:4200/api/users/:id
router.delete("/users/:id", auth, adminCheck, removeUsers);

//@Endpoint  http://localhost:4200/api/change-role
router.post("/change-role", auth, adminCheck, changeRole);

//@Endpoint  http://localhost:5000/api/users/:id
router.put("/users/:id", auth, adminCheck, updateUsers);
//=======User========//


//=======Cart========//

//@Endpoint  http://localhost:4200/api/user/cart
router.post("/user/cart", auth, userCart);

//@Endpoint  http://localhost:4200/api/user/cart
router.get("/user/cart", auth, getUserCart);

//@Endpoint  http://localhost:4200/api/user/cart
router.delete("/user/cart", auth, emptyCart);
//=======Cart========//


//=======AddressOrder========//
//@Endpoint  http://localhost:4200/api/user/address-order
router.post("/user/address-order", auth, saveAddressOrder);

//@Endpoint  http://localhost:4200/api/user/address-order/:id
router.delete("/user/address-order/:id", auth, removeAddressOrder);

//@Endpoint  http://localhost:4200/api/user/address-order
router.get("/user/address-order", auth, getAddressOrder);
//=======AddressOrder========//

//=======Order========//
//@Endpoint  http://localhost:4200/api/user/order
router.post("/user/order", auth, saveOrder);

//@Endpoint  http://localhost:4200/api/user/order
router.get("/user/order", auth, getOrder);

//@Endpoint  http://localhost:4200/api/seller/order:status
router.get("/seller/order/:status", auth, getOrderSeller);

//@Endpoint  http://localhost:4200/api/user/order
router.get("/user/order/:status", auth, getOrderStatus);

//@Endpoint  http://localhost:4200/api/user/order
router.put("/user/order/:id", auth, updateOrderStatus);

//@Endpoint  http://localhost:4200/api/user/order
router.put("/user/order-delivery/:id", auth, sellerCheck, updateDeliveryStatus);

//=======Order========//

//=======Wishlist========//

//@Endpoint  http://localhost:4200/api/user/wishlist
router.post("/user/wishlist", auth, addToWishlist);

//@Endpoint  http://localhost:4200/api/user/wishlist
router.get("/user/wishlist", auth, getWishlist);

//@Endpoint  http://localhost:4200/api/user/wishlist/:productId
router.put("/user/wishlist/:productId", auth, removeWishlist);

//=======Wishlist========//



module.exports = router;