const express = require("express");
const UserController = require("../../controllers/user-controller");

const router = express().router;

router.post("/signup",UserController.create);

module.exports = router;