import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updatePassword,
  updateAccountDetails,
  updateUserAvatar,
  getUserProfile,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Frontend Pages
router.route("/login").get((req, res) => {
  res.render("login");
});

router.route("/home").get((req, res) => {
  res.render("index");
});

// Backend Queries
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/login").post(loginUser);

// User must be logged In
router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refreshToken").post(verifyJWT, refreshAccessToken);

router.route("/updatePassword").post(verifyJWT, updatePassword);

router.route("/updateAccount").post(verifyJWT, updateAccountDetails);

router
  .route("/updateAvatar")
  .post(upload.fields([{ name: "avatar" }]), verifyJWT, updateUserAvatar);

router.route("/u/:username").get(getUserProfile);

export default router;
