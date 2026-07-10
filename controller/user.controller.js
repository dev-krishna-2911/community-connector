// this controller is used to do opreation on the user profile
// get the all information of the user
// update the user information
// update the user avatar

const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");

const logedinuser = async (req, res) => {
  if (!req.user) {
    return res
      .json({
        message: "user is not available || or logedin ",
      })
      .status(404);
  }
  const user = await userModel.findById(req.user.id).select("-password");

  if (!user) {
    return res.json({ message: "User is found" }).status(404);
  }

  return res.json({ user: user }).status(200);
};

module.exports = { logedinuser };
