const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const generateToken = require("../utils/generateToken");

exports.getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } });

  res.status(200).json(users);
});

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
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
    pic,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

exports.getUserProfile = (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    pic: req.user.pic,
  };
  res.status(200).json(user);
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
      pic: user.pic,
    });
  } else {
    res.status(400);
    throw new Error("invalid Email or Password !!");
  }
});

exports.allUsers = asyncHandler(async (req, res) => {
  // console.log(req);
  // console.log("user data === ", req.user);
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
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
