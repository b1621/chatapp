const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const generateToken = require("../utils/generateToken");

exports.getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

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
    generateToken(res, user._id);
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

exports.authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("invalid Email or Password !!");
  }
});

exports.logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "user Logged Out",
  });
});

exports.updateUserProfile = (req, res) => {
  res.send("update user profile");
};
