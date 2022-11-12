import express from "express";
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, sub, trend, updateVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";


//index.js video route method called this method.
const router = express.Router();

router.post("/", verifyToken, addVideo);

router.put("/:id", verifyToken, updateVideo);

router.delete("/:id", verifyToken, deleteVideo);

// we don't need to login to find a video so no need to call verifyToken.
router.get("/find/:id", getVideo);
router.get("/view/:id", addView);
router.get("/random", random);
router.get("/trend", trend);


// to get user id in video controller then should pass verifyToken in router.
router.get("/sub", verifyToken, sub);

router.get("/tags", getByTag);
router.get("/search", search);

export default router;