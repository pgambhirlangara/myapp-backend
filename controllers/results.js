const Results = require("../models/results.js");

exports.getResults = async (req, res) => {
  try {
    const results = await Results.find();

    return res
      .status(200)
      .set("access-control-allow-origin", "http://localhost:3000")
      .json(results);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
