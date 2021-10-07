const path = require("path");
const express = require("express");

const questionsController = require("../controllers/questions");

const router = express.Router();

// /questions
router.get("/", questionsController.getQuestions);

module.exports = router;
