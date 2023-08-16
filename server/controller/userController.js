exports.getAllUser = (req, res) => {
  res.send("get all user");
};
exports.getUserProfile = (req, res) => {
  res.send("get single user");
};

exports.authUser = (req, res) => {
  res.send("authenticate user");
};

exports.registerUser = (req, res) => {
  res.send("regiseter user");
};

exports.logoutUser = (req, res) => {
  res.send("logout user");
};
exports.updateUserProfile = (req, res) => {
  res.send("update user profile");
};
