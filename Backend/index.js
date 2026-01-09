const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./Models/db");

const AuthRouter = require("./Routes/AuthRouter");
const HomeRouter = require("./Routes/HomeRouter");
const protect = require("./Middlewares/Auth");

const app = express();

/* ---------- MIDDLEWARES ---------- */
app.use(cors());
app.use(express.json()); // bodyParser.json() ka replacement
app.use(express.urlencoded({ extended: true }));

/* ---------- STATIC FOLDER ---------- */
app.use("/uploads", express.static("uploads"));

/* ---------- ROUTES ---------- */
app.get("/", (req, res) => {
  res.send("Backend working");
});

app.use("/auth", AuthRouter);
app.use("/api/homes", HomeRouter);

app.get("/home", protect, (req, res) => {
  res.json({ message: `Welcome user with ID: ${req.user.id}` });
});

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
