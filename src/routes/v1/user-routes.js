const express = require("express");
const UserController = require("../../controllers/user-controller");

const router = express().router;

router.post("/signup",UserController.create);
router.post("/signin",UserController.signIn);
router.get("/users/:id",UserController.getUserById);

module.exports = router;