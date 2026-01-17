const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./Models/db");

const AuthRouter = require("./Routes/AuthRouter");
const homeRouter = require("./Routes/HomeRouter");
const protect = require("./Middlewares/Auth");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // serve images

app.use("/auth", AuthRouter);
app.use("/api/homes", homeRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
