const path = require("path");
const express = require("express");

const questionsController = require("../controllers/questions");

// /questions
const router = express.Router();

// /questions
// router.get("/", questionsController.showQuestion);
router.get("/", questionsController.getQuestions);

//@@@res.renderはejsで使う。
// router.get("/questions", questionsController.showQuestion);

// /questions/quesitons
// router.get("/questions", questionsController.getQuestions);

module.exports = router;
