const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const { configDotenv } = require("dotenv");
const app = express();
configDotenv();

app.use(express.json());
app.use(express.json({ extended: true }));
app.use(cookieParser());
//route
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers

const authrouter = require("./router/auth.router");
const communityrouter = require("./router/community.router");
const membershiprouter = require("./router/membership.router");
//router
app.use("/api/community/v1", communityrouter);
app.use("/api/membership/v1", membershiprouter);
app.use("/api/v1", authrouter);

app.listen(process.env.PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});
