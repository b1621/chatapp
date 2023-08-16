const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

exports.getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("user already exist");
  }

  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    console.log("user created");
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});
exports.getUserProfile = (req, res) => {
  res.send("get single user");
};

exports.authUser = (req, res) => {
  res.send("authenticate user");
};

exports.logoutUser = (req, res) => {
  res.send("logout user");
};
exports.updateUserProfile = (req, res) => {
  res.send("update user profile");
};
