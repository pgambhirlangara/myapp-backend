const Questions = require("../models/questions.js");

exports.showQuestion = (req, res, next) => {
  res.render("/questions", {
    path: "/questions",
  });
};

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Questions.find();
    console.log(questions);

    return res.status(200).json(questions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
