const express = require("express");
const router = express.Router();
const membershipcontroller = require("../controller/membership.controller");

const authmiddleware = require("../middleware/auth.middleware");

// get all memberships
router.get(
  "/membership/all/:communityId",
  authmiddleware.isAuthenticated,
  membershipcontroller.getAllMemberships,
);

// join a community
router.post(
  "/membership/join",
  authmiddleware.isAuthenticated,
  membershipcontroller.joinCommunity,
);

// search a member by the fullname of the user
router.get(
  "/membership/search/:communityId/:fullName",
  authmiddleware.isAuthenticated,
  membershipcontroller.getMembership,
);

module.exports = router;
