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

//@Endpoint  http://localhost:4200/api/requesttype
router.get("/requesttype", auth, listRequestType);

//@Endpoint  http://localhost:4200/api/requesttype
router.post("/requesttype", auth, adminCheck, createRequestType);

//@Endpoint  http://localhost:4200/api/requesttype/:id
router.get("/requesttype/:id", auth, readRequestType);

//@Endpoint  http://localhost:4200/api/requesttype/:id
router.put("/requesttype/:id", auth, adminCheck, updateRequestType);

//@Endpoint  http://localhost:4200/api/Requesttype/:id
router.delete("/requesttype/:id", auth, adminCheck, removeRequestType);

//@Endpoint  http://localhost:4200/api/request-other
router.post("/request-other", auth, createRequestOther);

//@Endpoint  http://localhost:4200/api/request-topup
router.post("/request-topup", auth, createRequestTopup);

//@Endpoint  http://localhost:4200/api/request-withdraw
router.post("/request-withdraw", auth, sellerCheck, createRequestWithdraw);

//@Endpoint  http://localhost:4200/api/request-signupseller/:status
router.post("/request-signupseller", auth, createRequestSignupSeller);

//@Endpoint  http://localhost:4200/api/request-other/:status
router.get("/request-other/:status", auth, getRequestOther);

//@Endpoint  http://localhost:4200/api/request-topup/:status
router.get("/request-topup/:status", auth, getRequestTopup);

//@Endpoint  http://localhost:4200/api/request-topup/:status
router.get("/request-withdraw/:status", auth, getRequestWithdraw);

//@Endpoint  http://localhost:4200/api/requests-other/:status
router.get("/requests-other/:status", auth, adminCheck, listRequestOther);

//@Endpoint  http://localhost:4200/api/requests-topup/:status
router.get("/requests-topup/:status", auth, adminCheck, listRequestTopup);

//@Endpoint  http://localhost:4200/api/requests-topup/:status
router.get("/requests-withdraw/:status", auth, adminCheck, listRequestWithdraw);

//@Endpoint  http://localhost:4200/api/requests-topup/:status
router.get("/requests-signupseller/:status", auth, adminCheck, listRequestSignupSeller);

//@Endpoint  http://localhost:4200/api/request-other/:id
router.put("/request-other/:id", auth, adminCheck, updateRequestOther);

//@Endpoint  http://localhost:4200/api/request-topup/:id
router.put("/request-topup/:id", auth, adminCheck, updateRequestTopup);

//@Endpoint  http://localhost:4200/api/request-withdraw/:id
router.put("/request-withdraw/:id", auth, adminCheck, updateRequestWithdraw);

//@Endpoint  http://localhost:4200/api/request-signupseller/:id
router.put("/request-signupseller/:id", auth, adminCheck, updateRequestSignupSeller);

//@Endpoint  http://localhost:4200/api/request-other/:id
router.delete("/request-other/:id", auth, removeRequestOther);

//@Endpoint  http://localhost:4200/api/request-topup/:id
router.delete("/request-topup/:id", auth, removeRequestTopup);

//@Endpoint  http://localhost:4200/api/request-withdraw/:id
router.delete("/request-withdraw/:id", auth, sellerCheck, removeRequestWithdraw);


module.exports = router;