const express = require("express");

const router = express.Router();

const loginController = require("../controllers/login");

router.get("/login", loginController.loginPage);

router.get("/logout", loginController.logoutProcess);

router.get("/sign-up", loginController.signUpPage);

router.post("/post-login", loginController.loginProcess);

router.post("/post-sign-up", loginController.signUpProcess);

module.exports = router;
