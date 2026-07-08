const express = require("express");
const router = express.Router();

// controller
const authcontroller = require("../controller/auth.controller");

router.post("/user/register", authcontroller.registerUser);
router.post("/user/login", authcontroller.loginUser);
router.post("/user/logout", authcontroller.logout);

module.exports = router;
