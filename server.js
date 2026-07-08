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
const authrouter = require("./router/auth.router");

app.use("/api/v1", authrouter);

app.listen(process.env.PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});
