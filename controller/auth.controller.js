// In this file, we will handle the authentication logic for our application.
//which includes user registration, login, and logout functionality.

const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");

//register User
const registerUser = async (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res
      .json({ message: "Please provide all required fields" })
      .status(400);
  }
  const isuserExist = await userModel.findOne({ email });
  if (isuserExist) {
    return res.json({ message: "User already exists" }).status(400);
  }

  const newUser = new userModel({
    fullName,
    email,
    password,
  });
  await newUser.save();
  res.json({ message: "User registered successfully" }).status(201);
};

// register User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({ message: "Please provide all vaild filed" });

  const user = await userModel.findOne({ email });

  const ispassswordCorrect = await bcrypt.compare(password, user.password);

  if (!ispassswordCorrect) {
    return res.json({ message: "Invaild credentials" }).status(401);
  }
  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  await res.cookie("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  res.json({ message: "User login successfully" }).status(200);
};
// complete this how to get cookie if it set on the frontend to backend
// const updatePassword=async(req,res)=>{
//     const
// }

const logout = async (req, res) => {
  await res.clearCookie("token");
  res.status(200).json({
    message: "User Successfully log out",
  });
};

module.exports = { registerUser, loginUser, logout };
