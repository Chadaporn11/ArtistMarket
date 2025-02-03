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
    createRequestWithdraw,
    createRequestSignupSeller,
    getRequestOther,
    getRequestTopup,
    getRequestWithdraw,
    updateRequestOther,
    updateRequestTopup,
    updateRequestWithdraw,
    updateRequestSignupSeller,
    listRequestOther,
    listRequestTopup,
    listRequestWithdraw,
    listRequestSignupSeller,
    removeRequestOther,
    removeRequestTopup,
    removeRequestWithdraw

} = require("../controllers/request");

// middleware
const { auth, adminCheck, sellerCheck } = require("../middleware/auth");

//@Endpoint  process.env.PORT/api/requesttype
router.get("/requesttype", auth, listRequestType);

//@Endpoint  process.env.PORT/api/requesttype
router.post("/requesttype", auth, adminCheck, createRequestType);

//@Endpoint  process.env.PORT/api/requesttype/:id
router.get("/requesttype/:id", auth, readRequestType);

//@Endpoint  process.env.PORT/api/requesttype/:id
router.put("/requesttype/:id", auth, adminCheck, updateRequestType);

//@Endpoint  process.env.PORT/api/Requesttype/:id
router.delete("/requesttype/:id", auth, adminCheck, removeRequestType);

//@Endpoint  process.env.PORT/api/request-other
router.post("/request-other", auth, createRequestOther);

//@Endpoint  process.env.PORT/api/request-topup
router.post("/request-topup", auth, createRequestTopup);

//@Endpoint  process.env.PORT/api/request-withdraw
router.post("/request-withdraw", auth, sellerCheck, createRequestWithdraw);

//@Endpoint  process.env.PORT/api/request-signupseller/:status
router.post("/request-signupseller", auth, createRequestSignupSeller);

//@Endpoint  process.env.PORT/api/request-other/:status
router.get("/request-other/:status", auth, getRequestOther);

//@Endpoint  process.env.PORT/api/request-topup/:status
router.get("/request-topup/:status", auth, getRequestTopup);

//@Endpoint  process.env.PORT/api/request-topup/:status
router.get("/request-withdraw/:status", auth, getRequestWithdraw);

//@Endpoint  process.env.PORT/api/requests-other/:status
router.get("/requests-other/:status", auth, adminCheck, listRequestOther);

//@Endpoint  process.env.PORT/api/requests-topup/:status
router.get("/requests-topup/:status", auth, adminCheck, listRequestTopup);

//@Endpoint  process.env.PORT/api/requests-topup/:status
router.get("/requests-withdraw/:status", auth, adminCheck, listRequestWithdraw);

//@Endpoint  process.env.PORT/api/requests-topup/:status
router.get("/requests-signupseller/:status", auth, adminCheck, listRequestSignupSeller);

//@Endpoint  process.env.PORT/api/request-other/:id
router.put("/request-other/:id", auth, adminCheck, updateRequestOther);

//@Endpoint  process.env.PORT/api/request-topup/:id
router.put("/request-topup/:id", auth, adminCheck, updateRequestTopup);

//@Endpoint  process.env.PORT/api/request-withdraw/:id
router.put("/request-withdraw/:id", auth, adminCheck, updateRequestWithdraw);

//@Endpoint  process.env.PORT/api/request-signupseller/:id
router.put("/request-signupseller/:id", auth, adminCheck, updateRequestSignupSeller);

//@Endpoint  process.env.PORT/api/request-other/:id
router.delete("/request-other/:id", auth, removeRequestOther);

//@Endpoint  process.env.PORT/api/request-topup/:id
router.delete("/request-topup/:id", auth, removeRequestTopup);

//@Endpoint  process.env.PORT/api/request-withdraw/:id
router.delete("/request-withdraw/:id", auth, sellerCheck, removeRequestWithdraw);


module.exports = router;