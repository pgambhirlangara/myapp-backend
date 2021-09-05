const path = require("path");
const express = require("express");

const sessionController = require("../controllers/session");

const router = express.Router();

router.get("/", sessionController.getSession);

module.exports = router;
