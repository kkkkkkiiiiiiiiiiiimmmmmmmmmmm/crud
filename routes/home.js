const express = require("express");

const router = express.Router();

const homeController = require("../controllers/home");

router.use("/", homeController.homePage);

module.exports = router;
