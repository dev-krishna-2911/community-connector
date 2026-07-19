const Membership = require("../model/membership.model");
const Community = require("../model/community.model");
const User = require("../model/user.model");

// join the community

const joinCommunity = async (req, res) => {
  const { communityId } = req.body;
  const userId = req.user.id;

  // Logic to join the community would go here
  const membership = new Membership({
    user: userId,
    community: communityId,
    role: "member", // default role
  });
  await membership.save();
  return res
    .json({ message: "Successfully joined the community", data: membership })
    .status(201);
};

// get  the all the membership of the community
const getAllMemberships = async (req, res) => {
  const { communityId } = req.params;

  const memberships = await Membership.find({
    community: communityId,
  }).populate("user", "fullName email profilePic");
  return res
    .json({ message: "All memberships", data: memberships })
    .status(200);
};

const getMembership = async (req, res) => {
  try {
    const { communityId, fullName } = req.params;

    // Find the user by full name
    const user = await User.findOne({ fullName });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the user is a member of the community
    const membership = await Membership.findOne({
      user: user._id,
      community: communityId,
    }).populate("user", "fullName email profilePic");

    if (!membership) {
      return res.status(404).json({
        success: false,
        message: "User is not a member of this community",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Membership found",
      data: membership,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { joinCommunity, getAllMemberships, getMembership };
