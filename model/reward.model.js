const mongoose = require("mongoose");
const rewardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    points: {
      type: Number,
      default: 0,
      min: 0,
    },
    badges: {
      type: String,
    },
    level: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Reward", rewardSchema);
