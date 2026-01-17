const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  description: { type: String },
  rating: { type: Number },
  image: { type: String }, // uploaded file name
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Home", homeSchema);
