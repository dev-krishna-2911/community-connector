const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({
      message: "!token is not there...May be user not loged in",
    });
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decode;
  console.log("this is from auth middleware", req.user);

  next();
};

module.exports = { isAuthenticated };
