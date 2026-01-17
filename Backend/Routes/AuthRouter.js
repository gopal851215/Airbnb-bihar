const express = require("express");
const router = express.Router();
const { signup, login } = require("../Controllers/Authcontroller"); // ✅ correct path

// Routes
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
