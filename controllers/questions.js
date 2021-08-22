const Questions = require("../models/questions");

exports.showQuestion = (req, res, next) => {
  res.render("/questions", {
    path: "/questions",
  });
};
