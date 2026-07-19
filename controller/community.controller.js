// this controller is for the is use to create the community
const Community = require("../model/community.model");
const Membership = require("../model/membership.model");

// get all the communities
const getAllCommunities = async (req, res) => {
  const getAllCommunities = await Community.find();
  return res
    .json({ message: "All communities", data: getAllCommunities })
    .status(200);
};

// create a new community

const addCommunity = async (req, res) => {
  const { name, description } = req.body;
  const createdBy = req.user.id;
  const community = new Community({ name, description, createdBy });
  await community.save();

  const membership = await Membership.create({
    user: createdBy,
    community: community._id,
    role: "leader",
  });
  await membership.save();

  return res.json({ message: "Community created successfully" }).status(201);
};

// search a community by name
const getCommunityByName = async (req, res) => {
  const { name } = req.params;
  const community = await Community.findOne({ name });
  return res.json({ message: "Community found", data: community }).status(200);
};

module.exports = { addCommunity, getAllCommunities, getCommunityByName };
