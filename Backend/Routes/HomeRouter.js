const express = require("express");
const router = express.Router();
const multer = require("multer");
const { addHome, getHomes } = require("../Controllers/HomeController");
const protect = require("../Middlewares/Auth"); // middleware that sets req.user

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/", protect, upload.single("photo"), addHome); // add home
router.get("/", getHomes); // get all homes

module.exports = router;
