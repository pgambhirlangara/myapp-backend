const path = require("path");
const express = require("express");

const questionsController = require("../controllers/questions");

const router = express.Router();

router.get("/questions", questionsController.showQuestion);

module.exports = router;
