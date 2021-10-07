const path = require("path");
const express = require("express");

const resultsController = require("../controllers/results");

const router = express.Router();

// /result
router.get("/", resultsController.getResults);

module.exports = router;
