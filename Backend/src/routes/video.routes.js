import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  uploadVideo,
  subscribedChannelVideos,
  allVideosforHomePage,
} from "../controllers/video.controller.js";

const router = Router();

// Only authenticated user
router.use(verifyJWT);

router.route("/uploadVideo").post(
  upload.fields([
    {
      name: "videoLocal",
      maxCount: 1,
    },
    {
      name: "thumbNailLocal",
      maxCount: 1,
    },
  ]),
  uploadVideo
);

// router.route("/home").get((req, res) => {
//   res.render("home");
// });
router.route("/home").get(allVideosforHomePage);
router.route("/home/subVids").get(subscribedChannelVideos);

// router.route("").get(subscribedChannelVideos);

export default router;
