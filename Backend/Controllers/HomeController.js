const Home = require("../Models/home");

const addHome = async (req, res) => {
  try {
    const { name, location, description, rating } = req.body;
    const image = req.file ? req.file.filename : null;

    // Only host can add homes
    if (req.user.role !== "host") {
      return res.status(403).json({ message: "Only hosts can add homes" });
    }

    console.log("REQ.BODY:", req.body);
    console.log("REQ.FILE:", req.file);

    const home = new Home({
      name,
      location,
      description,
      rating,
      image,
      addedBy: req.user.id,
    });

    await home.save();
    res.status(201).json(home);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getHomes = async (req, res) => {
  try {
    const homes = await Home.find();
    res.json(homes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addHome, getHomes };
