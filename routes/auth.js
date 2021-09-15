const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

//@@@@@
router.get("/me", authController.getMe);

// router.get("/login", authController.getLogin);

// router.get("/signup", authController.getSignup);

router.post("/login", authController.postLogin);

router.post("/signup", authController.postSignup);

// atode kesu
router.get("/logout", authController.postLogout);

router.post("/logout", authController.postLogout);

module.exports = router;
