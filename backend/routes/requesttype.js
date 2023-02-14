const express = require("express");
const router = express.Router();

//controller
const {
    listRequestType,
    readRequestType,
    createRequestType,
    updateRequestType,
    removeRequestType,
} = require("../controllers/requesttype");

// middleware
const { auth, adminCheck } = require("../middleware/auth");

//@Endpoint  http://localhost:4200/api/Requesttype
// router.get("/Requesttype", auth, listRequestType);
router.get("/requesttype", listRequestType);

//@Endpoint  http://localhost:4200/api/Requesttype
// router.post("/Requesttype", auth, adminCheck, createRequestType);
router.post("/requesttype", createRequestType);

//@Endpoint  http://localhost:4200/api/Requesttype/:id
// router.get("/Requesttype/:id", auth, adminCheck, readRequestType);
router.get("/requesttype/:id", readRequestType);

//@Endpoint  http://localhost:4200/api/Requesttype/:id
// router.put("/Requesttype/:id", auth, adminCheck, updateRequestType);
router.put("/requesttype/:id", updateRequestType);

//@Endpoint  http://localhost:4200/api/Requesttype/:id
// router.delete("/Requesttype/:id", auth, adminCheck, removeRequestType);
router.delete("/requesttype/:id", removeRequestType);


module.exports = router;