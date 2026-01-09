const Home = require("../Models/Home");

exports.addHome = async (req, res) => {
  try {
    const { name, location, description, rating } = req.body;

    if (!name || !location) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const newHome = new Home({
      name,
      location,
      description,
      rating,
      image: req.file ? req.file.filename : null,
      addedBy: req.user.id,
    });

    await newHome.save();

    res.status(201).json({
      message: "Home added successfully",
      home: newHome,
    });
  } catch (error) {
    console.error("ADD HOME ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getHomes = async (req, res) => {
  try {
    const homes = await Home.find().sort({ createdAt: -1 });
    res.json(homes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
