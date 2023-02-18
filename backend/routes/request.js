const express = require("express");
const router = express.Router();

//controller
const {
    listRequestType,
    readRequestType,
    createRequestType,
    updateRequestType,
    removeRequestType,
    createRequestOther,
    createRequestTopup,
    createRequestWithdraw
} = require("../controllers/request");

// middleware
const { auth, adminCheck, sellerCheck } = require("../middleware/auth");

//@Endpoint  http://localhost:4200/api/Requesttype
// router.get("/Requesttype", auth, listRequestType);
router.get("/requesttype", auth, listRequestType);

//@Endpoint  http://localhost:4200/api/Requesttype
// router.post("/Requesttype", auth, adminCheck, createRequestType);
router.post("/requesttype", auth, createRequestType);

//@Endpoint  http://localhost:4200/api/Requesttype/:id
// router.get("/Requesttype/:id", auth, adminCheck, readRequestType);
router.get("/requesttype/:id", auth, readRequestType);

//@Endpoint  http://localhost:4200/api/Requesttype/:id
// router.put("/Requesttype/:id", auth, adminCheck, updateRequestType);
router.put("/requesttype/:id", auth, updateRequestType);

//@Endpoint  http://localhost:4200/api/Requesttype/:id
// router.delete("/Requesttype/:id", auth, adminCheck, removeRequestType);
router.delete("/requesttype/:id", auth, removeRequestType);

//@Endpoint  http://localhost:4200/api/Requesttype/:id
// router.delete("/Requesttype/:id", auth, adminCheck, removeRequestType);
router.post("/request-other", auth, createRequestOther);

//@Endpoint  http://localhost:4200/api/Requesttype/:id
// router.delete("/Requesttype/:id", auth, adminCheck, removeRequestType);
router.post("/request-topup", auth, createRequestTopup);

//@Endpoint  http://localhost:4200/api/Requesttype/:id
// router.delete("/Requesttype/:id", auth, adminCheck, removeRequestType);
router.post("/request-withdraw", auth, createRequestWithdraw);


module.exports = router;