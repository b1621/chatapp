const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  registerUser,
  getAllUser,
  allUsers,
  getUserProfile,
  logoutUser,
  authUser,
  updateUserProfile,
} = require("../controller/userController");

router.get("/getusers", getAllUser);

router.get("/", allUsers);
router.post("/register", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .patch(protect, updateUserProfile);

module.exports = router;
