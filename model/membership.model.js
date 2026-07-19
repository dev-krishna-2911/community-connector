const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },

    role: {
      type: String,
      default: "member",
    },
  },
  { timestamps: true },
);

// Prevent duplicate membership
membershipSchema.index({ user: 1, community: 1 }, { unique: true });

module.exports = mongoose.model("Membership", membershipSchema);
// check add the manages the member in the community
