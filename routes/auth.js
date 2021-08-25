const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signin", authController.getSignin);

router.post("/login", authController.postLogin);

router.post("/signin", authController.postSignin);

router.post("/logout", authController.postLogout);

module.exports = router;
