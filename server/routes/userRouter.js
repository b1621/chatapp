const express = require("express");
const router = express.Router();

const {
  registerUser,
  getAllUser,
  getUserProfile,
  logoutUser,
  authUser,
  updateUserProfile,
} = require("../controller/userController");

router.get("/", getAllUser);
router.post("/register", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/profile").get(getUserProfile).patch(updateUserProfile);

module.exports = router;
