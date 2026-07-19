const express = require("express");
const router = express.Router();

const communitycontroller = require("../controller/community.controller");

//Middleware
const authmiddleware = require("../middleware/auth.middleware");

// get all communities
router.get(
  "/community/all",
  authmiddleware.isAuthenticated,
  communitycontroller.getAllCommunities,
);

//add a new community
router.post(
  "/community/add",
  authmiddleware.isAuthenticated,
  communitycontroller.addCommunity,
);

// search a community by name
router.get(
  "/community/search/:name",
  authmiddleware.isAuthenticated,
  communitycontroller.getCommunityByName,
);
module.exports = router;
