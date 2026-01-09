const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_CONN;

if (!mongoURI) {
  console.error("❌ MongoDB URI not found in .env");
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err.message);
  });
