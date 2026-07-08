const mongoose = require("mongoose");
const membershipSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
    role: {
      type: String,
      default: "member",
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Membership", membershipSchema);
