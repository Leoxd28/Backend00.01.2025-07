const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/"))
      return cb(new Error("Only image files allowed"));
    cb(null, true);
  },
});

router.post("/avatar", upload.single("avatar"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "file required" });
  res.json({
    filename: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype,
  });
});

module.exports = router;
