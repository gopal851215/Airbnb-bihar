const express = require("express");
const router = express.Router();

const auth = require("../Middlewares/Authmiddleware");
const upload = require("../Middlewares/upload");
const {
  addHome,
  getHomes,
} = require("../Controllers/HomeController");

router.post("/", auth, upload.single("photo"), addHome);
router.get("/", getHomes);

module.exports = router;
