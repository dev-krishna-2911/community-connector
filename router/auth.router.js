const express = require("express");
const router = express.Router();

// controller
const authcontroller = require("../controller/auth.controller");
const usercontroller = require("../controller/user.controller");

//Middleware
const authmiddleware = require("../middleware/auth.middleware");
// Authentication Router
router.post("/user/register", authcontroller.registerUser);
router.post("/user/login", authcontroller.loginUser);
router.post("/user/logout", authcontroller.logout);

//User Router
// first route should be get the infromation of the user
router.get(
  "/user/logedin",
  authmiddleware.isAuthenticated,
  usercontroller.logedinuser,
);
module.exports = router;
