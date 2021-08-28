const path = require("path");
const express = require("express");

const resultsController = require("../controllers/results");

const router = express.Router();

router.get("/", resultsController.getResults);

module.exports = router;
