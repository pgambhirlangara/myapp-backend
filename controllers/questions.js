const Questions = require("../models/questions.js");

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Questions.find();

    return res
      .status(200)
      .set("access-control-allow-origin", "http://localhost:3000")
      .json(questions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
