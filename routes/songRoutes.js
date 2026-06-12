const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const songController = require("../controllers/songController");
const requireLogin = require("../middlewares/authMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.get("/", songController.getAllSongs);
router.get("/create", requireLogin, songController.showCreateForm);
router.post("/", requireLogin, upload.single("image"), songController.createSong);
router.get("/:id/edit", requireLogin, songController.showEditForm);
router.put("/:id", requireLogin, upload.single("image"), songController.updateSong);
router.delete("/:id", requireLogin, songController.deleteSong);
router.get("/:id", songController.getSongDetail);

module.exports = router;
