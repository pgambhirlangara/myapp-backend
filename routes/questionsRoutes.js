const path = require("path");
const express = require("express");

const questionsController = require("../controllers/questions");

const router = express.Router();

router.get("/", questionsController.showQuestion);

router.get("/questions", questionsController.showQuestion);

router.get("/questions", questionsController.getQuestions);

module.exports = router;
