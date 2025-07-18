const express = require("express");
const UserController = require("../../controllers/user-controller");
const {AuthRequestValidators} = require("../../middlewares/index");

const router = express().router;

router.post("/signup",AuthRequestValidators.validateUserAuth,UserController.create);
router.post("/signin",AuthRequestValidators.validateUserAuth,UserController.signIn);
router.get("/users/:id",UserController.getUserById);

module.exports = router;